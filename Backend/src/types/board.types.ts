import { Document, Types } from "mongoose";

export interface IBoard extends Document {
  name: string;
  workspaceId: Types.ObjectId;
  type: "TASK" | "WHITEBOARD";
  createdBy: Types.ObjectId;
}


export interface CreateBoardInput{
  name:string,
  workspaceId:string,
  type:"TASK"|"WHITEBOARD",
  createdBy:string
}