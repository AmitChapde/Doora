import mongoose from "mongoose";
import { IWorkspacemember } from "../types/workspacemember.types";

const workspaceMemberSchema = new mongoose.Schema<IWorkspacemember>(
  {
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["ADMIN", "EDITOR", "VIEWER"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const WorkspaceMember = mongoose.model(
  "WorkspaceMember",
  workspaceMemberSchema
);

export default WorkspaceMember;
