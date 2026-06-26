import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  category: { type: String, required: true },
  factor: { type: String, required: true },
  questionText: { type: String, required: true },
  type: { type: String, required: true },
  answer: { type: mongoose.Schema.Types.Mixed, default: null },
});

const responseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assessment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assessment",
      required: true,
    },
    assessmentTitle: { type: String, required: true },
    answers: { type: [answerSchema], default: [] },
  },
  { timestamps: true }
);

const Response = mongoose.model("Response", responseSchema);

export default Response;
