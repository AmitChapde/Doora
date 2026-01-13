import {
  createBoard,
  getBoardsByWorkspace,
  getBoardById,
  deleteBoardById
} from "../services/board.service";
import { Request, Response } from "express";


const createBoardController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ mesasge: "Unauthorized" });
      return;
    }
    const { workspaceId } = req.params;
    const { name, type } = req.body;

    const newBoard = await createBoard({
      workspaceId,
      name,
      type,
      createdBy: req.user.id,
    });
  
    res.status(201).json({
      status: "success",
      data: {
        newBoard,
      },
    });
  } catch (error) {
  
    res.status(500).json({ message: "Not able to create Board" });
  }
};


const getBoardByIdController=async(req:Request,res:Response):Promise<void>=>{
    try {
        const {boardId}=req.params;
        const board=await  getBoardById(boardId)

        res.status(200).json({
            status:'success',
            data:{
                board
            }
        })
    } catch (error) {
        res.status(500).json({message:"Error getting board"})
    }
}

const getBoardsByWorkspaceController=async(req:Request,res:Response)=>{
    try {
        const {workspaceId}=req.params;
        const boards=await getBoardsByWorkspace(workspaceId)
        res.status(200).json({
            status:"success",
            data:{
                boards  
            }
        })
    } catch (error) {
        res.status(500).json({message:"Error getting board"})
    }
}

const deleteBoardByIdController=async(req:Request,res:Response)=>{
    try {
        const {boardId}=req.params; 
        await deleteBoardById(boardId);
        res.status(204).json({
            status:"success",
            data:null
        })
    } catch (error) {
        res.status(500).json({message:"Error deleting board"})
    }   
    
}
export { createBoardController,getBoardByIdController,getBoardsByWorkspaceController,deleteBoardByIdController };
