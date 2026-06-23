// Thin wrapper around localStorage so the rest of the app
// never has to think about JSON parsing or key names.

const STORAGE_KEY = 'ledger.entries.v1'

export function loadEntries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return seedEntries()
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed) || parsed.length === 0) return seedEntries()
    return parsed
  } catch {
    return seedEntries()
  }
}

export function saveEntries(entries) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  } catch {
    // storage unavailable (e.g. private mode) — fail silently
  }
}

// A few sample entries so the dashboard never opens empty.
function seedEntries() {
  const today = new Date()
  const daysAgo = (n) => {
    const d = new Date(today)
    d.setDate(d.getDate() - n)
    return d.toISOString().slice(0, 10)
  }

  return [
    { id: 'seed-1', type: 'income', category: 'salary', amount: 65000, note: 'Monthly salary', date: daysAgo(18) },
    { id: 'seed-2', type: 'expense', category: 'housing', amount: 16000, note: 'Rent', date: daysAgo(17) },
    { id: 'seed-3', type: 'expense', category: 'food', amount: 2400, note: 'Groceries', date: daysAgo(14) },
    { id: 'seed-4', type: 'expense', category: 'transport', amount: 1200, note: 'Fuel + cab', date: daysAgo(12) },
    { id: 'seed-5', type: 'income', category: 'freelance', amount: 9000, note: 'Design project', date: daysAgo(10) },
    { id: 'seed-6', type: 'expense', category: 'entertainment', amount: 1500, note: 'Movies & dinner', date: daysAgo(8) },
    { id: 'seed-7', type: 'expense', category: 'shopping', amount: 3200, note: 'New shoes', date: daysAgo(6) },
    { id: 'seed-8', type: 'expense', category: 'health', amount: 800, note: 'Pharmacy', date: daysAgo(4) },
    { id: 'seed-9', type: 'expense', category: 'food', amount: 1800, note: 'Eating out', date: daysAgo(2) },
    { id: 'seed-10', type: 'income', category: 'investment', amount: 2200, note: 'Dividends', date: daysAgo(1) }
  ]
}
