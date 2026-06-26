import { useState } from "react";
import CategoryItem from "../components/CategoryItem";
import QuestionSettingsModal from "../components/QuestionSettingsModal";

export default function Builder() {
  const [categories, setCategories] = useState([]);
  const [settingsTarget, setSettingsTarget] = useState(null);

  const mapCategory = (catId, fn) =>
    setCategories((prev) => prev.map((c) => (c.id === catId ? fn(c) : c)));

  const mapFactor = (catId, facId, fn) =>
    mapCategory(catId, (c) => ({
      ...c,
      factors: c.factors.map((f) => (f.id === facId ? fn(f) : f)),
    }));

  const addCategory = () =>
    setCategories((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: "New Category", factors: [] },
    ]);

  const renameCategory = (catId, name) =>
    mapCategory(catId, (c) => ({ ...c, name }));

  const removeCategory = (catId) =>
    setCategories((prev) => prev.filter((c) => c.id !== catId));

  const addFactor = (catId) =>
    mapCategory(catId, (c) => ({
      ...c,
      factors: [
        ...c.factors,
        { id: crypto.randomUUID(), name: "New Factor", questions: [] },
      ],
    }));

  const renameFactor = (catId, facId, name) =>
    mapFactor(catId, facId, (f) => ({ ...f, name }));

  const removeFactor = (catId, facId) =>
    mapCategory(catId, (c) => ({
      ...c,
      factors: c.factors.filter((f) => f.id !== facId),
    }));

  const confirmQuestions = (questions) => {
    const { catId, facId } = settingsTarget;
    mapFactor(catId, facId, (f) => ({
      ...f,
      questions: [...f.questions, ...questions],
    }));
    setSettingsTarget(null);
  };

  const changeQuestion = (catId, facId, qId, updated) =>
    mapFactor(catId, facId, (f) => ({
      ...f,
      questions: f.questions.map((q) => (q.id === qId ? updated : q)),
    }));

  const removeQuestion = (catId, facId, qId) =>
    mapFactor(catId, facId, (f) => ({
      ...f,
      questions: f.questions.filter((q) => q.id !== qId),
    }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-slate-800">Builder</h1>
        <button
          onClick={addCategory}
          className="px-4 py-2 rounded bg-slate-800 text-white text-sm hover:bg-slate-700"
        >
          + Add Category
        </button>
      </div>

      {categories.length === 0 ? (
        <div className="text-center text-slate-400 border border-dashed border-slate-300 rounded-lg py-16">
          No categories yet. Start by adding a category.
        </div>
      ) : (
        <div className="space-y-4">
          {categories.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              onRename={(name) => renameCategory(category.id, name)}
              onRemove={() => removeCategory(category.id)}
              onAddFactor={() => addFactor(category.id)}
              onRenameFactor={(facId, name) =>
                renameFactor(category.id, facId, name)
              }
              onRemoveFactor={(facId) => removeFactor(category.id, facId)}
              onAddQuestions={(facId) =>
                setSettingsTarget({ catId: category.id, facId })
              }
              onChangeQuestion={(facId, qId, updated) =>
                changeQuestion(category.id, facId, qId, updated)
              }
              onRemoveQuestion={(facId, qId) =>
                removeQuestion(category.id, facId, qId)
              }
            />
          ))}
        </div>
      )}

      {settingsTarget && (
        <QuestionSettingsModal
          onClose={() => setSettingsTarget(null)}
          onConfirm={confirmQuestions}
        />
      )}
    </div>
  );
}
