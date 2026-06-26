import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  type: {
    type: String,
    enum: ["multiple_choice", "rating", "text", "boolean"],
    required: true,
  },
  options: { type: [String], default: [] },
});

const factorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  questions: { type: [questionSchema], default: [] },
});

const categorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    factors: { type: [factorSchema], default: [] },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export { questionSchema, factorSchema };
export default Category;
