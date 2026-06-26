import Assessment from "../models/Assessment.js";
import Category from "../models/Category.js";

const saveCategoriesForReuse = async (userId, categories) => {
  await Promise.all(
    categories.map((category) =>
      Category.findOneAndUpdate(
        { user: userId, name: category.name },
        { user: userId, name: category.name, factors: category.factors },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      )
    )
  );
};

export const createAssessment = async (req, res) => {
  try {
    const { title, categories } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Assessment title is required" });
    }
    if (!Array.isArray(categories) || categories.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one category is required" });
    }
    const assessment = await Assessment.create({
      user: req.user._id,
      title,
      categories,
    });
    await saveCategoriesForReuse(req.user._id, categories);
    res.status(201).json(assessment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const listAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(assessments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!assessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }
    res.json(assessment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
