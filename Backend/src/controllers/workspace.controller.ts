import {
  createWorkspace,
  getUserWorkspaces,
  getWorkspaceById,
} from "../services/workspace.service";
import { Request, Response } from "express";
import { createWorkspaceInput } from "../types/workspace.types";

const createWorkspaceController = async (
  req: Request<{}, {}, createWorkspaceInput>,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const userId = req.user.id;
    const newWorkspace = await createWorkspace({
      name: req.body.name,
      userId,
    });

    res.status(201).json({
      status: "success",
      data: newWorkspace,
    });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Error creating workspace", error: error.message });
    }
  }
};

const getUserWorkspacesController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ messaeg: "Unauthorized" });
      return;
    }
    const workspaces = await getUserWorkspaces(req.user.id);
    res.status(200).json({
      status: "success",
      data: {
        workspaces,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user Workspaces" });
  }
};

const getWorkspaceByIdController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ messaeg: "Unauthorized" });
    return;
  }
  try {
    const workspace = await getWorkspaceById(req.params.workspaceId);

    res.status(200).json({
      status: "success",
      data: {
        workspace,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching Workspace" });
  }
};
export {
  createWorkspaceController,
  getWorkspaceByIdController,
  getUserWorkspacesController,
};
