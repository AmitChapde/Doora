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

const inviteWorkspaceMember = async ({
  workspaceId,
  invitedUserId,
  role,
}: InviteWorkspaceMemberInput) => {};

export { createWorkspaceMember };
