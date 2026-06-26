export const QUESTION_TYPES = [
  { value: "multiple_choice", label: "Multiple Choice" },
  { value: "rating", label: "Rating" },
  { value: "text", label: "Text" },
  { value: "boolean", label: "Yes / No" },
];

export const typeLabel = (value) =>
  QUESTION_TYPES.find((t) => t.value === value)?.label || value;
