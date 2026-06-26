import mongoose from "mongoose";
import { factorSchema } from "./Category.js";

const assessmentCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  factors: { type: [factorSchema], default: [] },
});

const assessmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true, trim: true },
    categories: { type: [assessmentCategorySchema], default: [] },
  },
  { timestamps: true }
);

const Assessment = mongoose.model("Assessment", assessmentSchema);

export default Assessment;
