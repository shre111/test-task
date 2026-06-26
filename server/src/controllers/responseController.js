import Response from "../models/Response.js";
import Assessment from "../models/Assessment.js";

export const createResponse = async (req, res) => {
  try {
    const { assessmentId, answers } = req.body;
    if (!assessmentId) {
      return res.status(400).json({ message: "assessmentId is required" });
    }
    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ message: "Answers are required" });
    }

    const assessment = await Assessment.findOne({
      _id: assessmentId,
      user: req.user._id,
    });
    if (!assessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }

    const response = await Response.create({
      user: req.user._id,
      assessment: assessment._id,
      assessmentTitle: assessment.title,
      answers,
    });
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const listResponses = async (req, res) => {
  try {
    const responses = await Response.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(responses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
