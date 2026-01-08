import { Document,Types } from "mongoose";


export interface IWorkspace extends Document {
  name: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt:Date;
}

export interface createWorkspaceInput{
    name:string;
}