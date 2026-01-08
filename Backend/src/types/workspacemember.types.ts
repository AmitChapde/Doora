import { Document, Types } from "mongoose";

export interface IWorkspacemember extends Document {
  workspaceId: Types.ObjectId;
  userId: Types.ObjectId;
  role: "ADMIN" | "EDITOR" | "VIEWER";
}

export interface createWorkspaceMemberInput {
  workspaceId: string;
  userId: string;
  role: "ADMIN" | "EDITOR" | "VIEWER";
}


export interface InviteWorkspaceMemberInput{
  workspaceId:string,
  invitedUserId:string,
  role:"EDITOR" | "VIEWER"
}