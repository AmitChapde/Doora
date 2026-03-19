import Workspace from "../models/workspace.model";
import WorkspaceMember from "../models/workspacemember.model";
import { createWorkspaceMember } from "./workspaceMember.service";

const createWorkspace = async ({
  name,
  userId,
}: {
  name: string;
  userId: string;
}) => {
  const newWorkspace = await Workspace.create({ name, createdBy: userId });

  await createWorkspaceMember({
    workspaceId: newWorkspace._id.toString(),
    userId,
    role: "ADMIN",
  });

  await newWorkspace.populate({
    path: "createdBy",
    select: "name email _id",
  });

  return {
    role: "ADMIN",
    workspace: newWorkspace,
  };
};

const getUserWorkspaces = async (userId: string) => {
  const memberships = await WorkspaceMember.find({ userId }).populate({
    path: "workspaceId",
    populate: { path: "createdBy", select: "name email" },
  });

  return memberships.map((m) => ({
    role: m.role,
    workspace: m.workspaceId,
  }));
};

const getWorkspaceById = async (workspaceId: string) => {
  const workspace = await Workspace.findById(workspaceId).populate(
    "createdBy",
    "name email",
  );
  return workspace;
};
export { createWorkspace, getUserWorkspaces, getWorkspaceById };
