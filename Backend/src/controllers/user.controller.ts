import { getAllUsers, getUserById } from "../services/user.service";
import { Request, Response } from "express";

const getAllUsersController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await getAllUsers();
    res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Error fetching users", error: error.message });
    }
  }
};

const getUserByIdController = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ messag: "Error while fetching user", error: error.message });
    }
  }
};
export { getAllUsersController, getUserByIdController };
