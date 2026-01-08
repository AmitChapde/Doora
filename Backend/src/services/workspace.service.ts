import Workspace from "../models/workspace.model";
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
  return {
    id: newWorkspace._id,
    name: newWorkspace.name,
    createdBy: newWorkspace.createdBy,
  };
};

export { createWorkspace };
