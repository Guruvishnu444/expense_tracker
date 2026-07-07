// Category catalogue shared across the app.
// Each category carries a color so charts and badges stay consistent.

export const EXPENSE_CATEGORIES = [
  { id: 'food', label: 'Food & Dining', color: '#f2667a' },
  { id: 'transport', label: 'Transport', color: '#d8b26a' },
  { id: 'housing', label: 'Housing & Bills', color: '#7aa2f7' },
  { id: 'shopping', label: 'Shopping', color: '#c792ea' },
  { id: 'health', label: 'Health', color: '#5fd3c4' },
  { id: 'entertainment', label: 'Entertainment', color: '#f0a35e' },
  { id: 'other', label: 'Other', color: '#8a8fa3' }
]

export const INCOME_CATEGORIES = [
  { id: 'salary', label: 'Salary', color: '#3ddc9a' },
  { id: 'freelance', label: 'Freelance', color: '#5fd3c4' },
  { id: 'investment', label: 'Investment', color: '#d8b26a' },
  { id: 'gift', label: 'Gift', color: '#c792ea' },
  { id: 'other_income', label: 'Other', color: '#8a8fa3' }
]

export function getCategoryMeta(type, id) {
  const list = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES
  return list.find((c) => c.id === id) || list[list.length - 1]
}
