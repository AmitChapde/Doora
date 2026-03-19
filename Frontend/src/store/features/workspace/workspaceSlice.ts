import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createWorkspaceApi,
  getAllWorkspacesApi,
  getWorkspaceMembersApi,
} from "../../../api/workspace/workspace.api";
import type {
  WorkspaceState,
  createWorkspace,
  WorkspaceWithRole,
} from "../../../api/workspace/workspace.types";

export const generateWorkspace = createAsyncThunk(
  "workspace/create",
  async (payload: createWorkspace) => {
    const response = await createWorkspaceApi(payload);
    return response;
  },
);
export const fetchAllWorkspaces = createAsyncThunk(
  "workspace/fetchAll",
  async () => {
    const response = await getAllWorkspacesApi();
    return response;
  },
);

export const fetchWorkspaceMembers = createAsyncThunk(
  "workspace/fetchMembers",
  async (workspaceId: string) => {
    const response = await getWorkspaceMembersApi(workspaceId);
    return {
      workspaceId,
      members: response.data.data.members,
    };
  },
);

const initialState: WorkspaceState = {
  workspaces: [],
  activeWorkspaceId: null,
  membersByWorkspace: {},
  loading: false,
  error: null,
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setActiveWorkspace(state, action) {
      state.activeWorkspaceId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllWorkspaces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllWorkspaces.fulfilled, (state, action) => {
        state.loading = false;
        state.workspaces = action.payload;
      })
      .addCase(fetchAllWorkspaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch workspaces";
      })

      .addCase(fetchWorkspaceMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkspaceMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.membersByWorkspace[action.payload.workspaceId] =
          action.payload.members;
      })
      .addCase(fetchWorkspaceMembers.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ?? "Failed to fetch workspace members";
      })

      .addCase(generateWorkspace.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateWorkspace.fulfilled, (state, action) => {
        state.loading = false;
        state.workspaces.push(action.payload as WorkspaceWithRole);
      })
      .addCase(generateWorkspace.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to create workspace ";
      });
  },
});

export const { setActiveWorkspace } = workspaceSlice.actions;
export default workspaceSlice.reducer;
