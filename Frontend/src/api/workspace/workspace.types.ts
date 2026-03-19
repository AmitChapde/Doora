  export type createWorkspace = {
    name: string;
  };

export type createWorkspaceResponse = {
  status: string;
  data: {
    role: WorkspaceRole;
    workspace: Workspace;
  };
};
export type WorkspaceWithRole = Workspace & {
  role: WorkspaceRole;
};

export type WorkspaceRole = "ADMIN" | "EDITOR" | "VIEWER";

export type WorkspaceListItem = {
  role: WorkspaceRole;
  workspace: Workspace;
};

export type getAllWorkspacesResponse = {
  status: string;
  data: {
    workspaces: WorkspaceListItem[];
  };
};

export type getWorkspaceByIdResponse = {
  status: string;
  data: {
    workspace: Workspace;
  };
};

export type inviteWorkspaceMembers = {
  userId: string;
  role: WorkspaceRole;
};

export type Workspace = {
  _id: string;
  name: string;
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt?: string;
  updatedAt?: string;
};

export type WorkspaceMember = {
  _id: string;
  workspaceId: string;
  userId: {
    id: string;
    name: string;
    email: string;
  };
  role: WorkspaceRole;
};

export type WorkspaceState = {
  workspaces: WorkspaceWithRole[];
  activeWorkspaceId: string | null;
  membersByWorkspace: Record<string, WorkspaceMember[]>;
  loading: boolean;
  error: string | null;
};
