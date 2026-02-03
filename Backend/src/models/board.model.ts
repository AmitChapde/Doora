import mongoose from "mongoose";
import { IBoard } from "../types/board.types";

const boardSchema = new mongoose.Schema<IBoard>(
  {
    name: {
      type: String,
      required: true,
    },
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    type: {
      type: String,
      enum: ["TASK", "WHITEBOARD"],
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Board = mongoose.model("Board", boardSchema);
export default Board;