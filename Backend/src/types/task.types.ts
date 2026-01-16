import { Document, Types } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  boardId: Types.ObjectId;
  workspaceId: Types.ObjectId;
  createdBy: Types.ObjectId;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  order: number;
}

export interface createTaskInput {
  title: string;
  description: string;
  boardId: Types.ObjectId;
  workspaceId: Types.ObjectId;
  createdBy: Types.ObjectId;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  order: number;
}

export interface UpdateTaskInput {
  name: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  order: number;
}

export interface ReorderTaskInput {
  boardId: Types.ObjectId;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  orderedTaskIds: string[];
}

export interface MoveTaskInput {
  boardId: Types.ObjectId;
  taskId: Types.ObjectId;
  fromStatus: "TODO" | "IN_PROGRESS" | "DONE";
  toStatus: "TODO" | "IN_PROGRESS" | "DONE";
  toIndex: number;
}
