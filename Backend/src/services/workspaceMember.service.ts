import User from "../models/user.model";
import WorkspaceMember from "../models/workspacemember.model";
import {
  createWorkspaceMemberInput,
  InviteWorkspaceMemberInput,
} from "../types/workspacemember.types";

const createWorkspaceMember = async ({
  workspaceId,
  userId,
  role,
}: createWorkspaceMemberInput) => {
  const existingMember = await WorkspaceMember.findOne({
    workspaceId,
    userId,
  });
  if (existingMember) {
    throw new Error("User is already a member of this workspace");
  }

  const newWorkspaceMember = WorkspaceMember.create({
    workspaceId,
    userId,
    role,
  });

  return newWorkspaceMember;
};

const getWorkspaceMembersByWorkspaceId = async (workspaceId: string) => {
  const workspaceMembers = await WorkspaceMember.find({ workspaceId }).populate(
    "userId",
    "name email"
  );

  return workspaceMembers;
};

const inviteWorkspaceMember = async ({
  workspaceId,
  invitedUserId,
  role,
}: InviteWorkspaceMemberInput) => {
  if (!["EDITOR", "VIEWER"].includes(role)) {
    throw new Error("Invalid Role");
  }
  const userExists = await User.findById(invitedUserId);
  if (!userExists) {
    throw new Error("User not found");
  }

  return createWorkspaceMember({
    workspaceId,
    userId: invitedUserId,
    role,
  });
};

export {
  createWorkspaceMember,
  getWorkspaceMembersByWorkspaceId,
  inviteWorkspaceMember,
};
