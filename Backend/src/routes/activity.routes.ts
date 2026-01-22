import { Router } from "express";
import { getBoardActivitiesController } from "../controllers/activity.controller";
import restrictBoardRole from "../middlewares/restrictBoardRole";
import { protectController } from "../controllers/auth.controller";


const router = Router();

router.get("/boards/:boardId/activities",protectController,
    restrictBoardRole("ADMIN", "EDITOR", "VIEWER"), getBoardActivitiesController)



export default router;