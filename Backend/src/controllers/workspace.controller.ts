import { createWorkspace } from "../services/workspace.service";
import { Request, Response } from "express";
import { createWorkspaceInput } from "../types/workspace.types";


const createWorkspaceController = async (
  req: Request<{}, {}, createWorkspaceInput>,
  res: Response
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
      data: {
        workspace: newWorkspace,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Error creating workspace", error: error.message });
    }
  }
};

export { createWorkspaceController };
