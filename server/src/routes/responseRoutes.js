import { Router } from "express";
import {
  createResponse,
  listResponses,
} from "../controllers/responseController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.use(protect);
router.route("/").post(createResponse).get(listResponses);

export default router;
