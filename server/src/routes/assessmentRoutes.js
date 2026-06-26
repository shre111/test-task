import { Router } from "express";
import {
  createAssessment,
  listAssessments,
  getAssessment,
} from "../controllers/assessmentController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.use(protect);
router.route("/").post(createAssessment).get(listAssessments);
router.route("/:id").get(getAssessment);

export default router;
