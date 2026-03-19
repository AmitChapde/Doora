import { apiClient } from "../client";
import type {
  createWorkspace,
  createWorkspaceResponse,
  getAllWorkspacesResponse,
  getWorkspaceByIdResponse,
  inviteWorkspaceMembers,
} from "./workspace.types";

export const getAllWorkspacesApi = async () => {
  const res = await apiClient.get<getAllWorkspacesResponse>("/workspaces");
  return res.data.data.workspaces.map((item) => ({
    ...item.workspace,
    role: item.role,
  }));
};

export const getWorkspaceByIdApi = (workspaceId: string) => {
  return apiClient.get<getWorkspaceByIdResponse>(`/workspaces/${workspaceId}`);
};

export const createWorkspaceApi = async (payload: createWorkspace) => {
  const res = await apiClient.post<createWorkspaceResponse>(
    "/workspaces",
    payload,
  );
  const { role, workspace } = res.data.data;

  return {
    ...workspace,
    role,
  };
};

export const getWorkspaceMembersApi = (workspaceId: string) => {
  return apiClient.get(`/workspaces/${workspaceId}/members`);
};

export const inviteWorkspaceMembersApi = (
  workspaceId: string,
  payload: inviteWorkspaceMembers,
) => {
  return apiClient.post(`/workspaces/${workspaceId}/members`, payload);
};
