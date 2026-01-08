import mongoose from "mongoose";
import { IWorkspace } from "../types/workspace.types";

const workspaceSchema = new mongoose.Schema<IWorkspace>(
  {
    name: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Workspace = mongoose.model<IWorkspace>("Workspace", workspaceSchema);

export default Workspace;
