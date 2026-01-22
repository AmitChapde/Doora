import { Document, Types } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  boardId: Types.ObjectId;
  workspaceId: Types.ObjectId;
  createdBy: Types.ObjectId;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface createTaskInput {
  title: string;
  description: string;
  boardId: Types.ObjectId;
  workspaceId: Types.ObjectId;
  createdBy: Types.ObjectId;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  order: number;
  userId:string;
}

export interface UpdateTaskInput {
  name: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  order: number;
  userId: string;
}

export interface ReorderTaskInput {
  boardId: Types.ObjectId;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  orderedTaskIds: string[];
  lastKnownUpdatedAt: string;
  userId:string;
}

export interface MoveTaskInput {
  boardId: Types.ObjectId;
  taskId: Types.ObjectId;
  fromStatus: "TODO" | "IN_PROGRESS" | "DONE";
  toStatus: "TODO" | "IN_PROGRESS" | "DONE";
  toIndex: number;
  fromUpdatedAt: string;
  toUpdatedAt: string;
  userId:string;
}
