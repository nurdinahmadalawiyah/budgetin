/**
 * Maps budgeting method ID (profileId) to the i18n key for its method name.
 *
 * Method name examples (from en.ts summaryKey):
 *   "anti-impulse"   → "Okane Kakeibo"
 *   "flexible"       → "Sinking Fund Strategy"
 *   "freedom"        → "FIRE Mode"
 *   "priority-based" → "50/30/20 Rule"
 *   "zero-based"     → "Zero-Based Budgeting"
 */
export const BUDGETING_METHOD_NAME_KEYS: Record<string, string> = {
  "anti-impulse":   "interactiveQuiz.recommendation.antiImpulse.summary",
  "flexible":       "interactiveQuiz.recommendation.flexible.summary",
  "freedom":        "interactiveQuiz.recommendation.freedom.summary",
  "priority-based": "interactiveQuiz.recommendation.priorityBased.summary",
  "zero-based":     "interactiveQuiz.recommendation.zeroBased.summary",
};
