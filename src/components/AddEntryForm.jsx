import { useState } from 'react'
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../data/categories.js'
import { todayISO } from '../utils/format.js'

const initialState = {
  type: 'expense',
  category: EXPENSE_CATEGORIES[0].id,
  amount: '',
  note: '',
  date: todayISO()
}

export default function AddEntryForm({ onAdd }) {
  const [form, setForm] = useState(initialState)
  const [error, setError] = useState('')

  const categories = form.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES

  function handleTypeChange(type) {
    const list = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES
    setForm((f) => ({ ...f, type, category: list[0].id }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const amount = parseFloat(form.amount)
    if (!amount || amount <= 0) {
      setError('Enter an amount greater than zero.')
      return
    }
    onAdd({ ...form, amount })
    setForm({ ...initialState, type: form.type, category: categories[0].id })
    setError('')
  }

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      <div className="card-head">
        <h3>Add entry</h3>
        <span className="card-head-hint">Log income or a new expense</span>
      </div>

      <div className="type-toggle" role="group" aria-label="Entry type">
        <button
          type="button"
          className={form.type === 'expense' ? 'toggle-btn is-active expense' : 'toggle-btn'}
          onClick={() => handleTypeChange('expense')}
        >
          Expense
        </button>
        <button
          type="button"
          className={form.type === 'income' ? 'toggle-btn is-active income' : 'toggle-btn'}
          onClick={() => handleTypeChange('income')}
        >
          Income
        </button>
      </div>

      <div className="field-row">
        <label className="field">
          <span>Amount (₹)</span>
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={form.amount}
            onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
          />
        </label>

        <label className="field">
          <span>Date</span>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
          />
        </label>
      </div>

      <div className="field-row">
        <label className="field">
          <span>Category</span>
          <select
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Note (optional)</span>
          <input
            type="text"
            placeholder="e.g. Groceries"
            value={form.note}
            onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
          />
        </label>
      </div>

      {error && <p className="form-error">{error}</p>}

      <button type="submit" className="submit-btn">
        Add {form.type === 'income' ? 'income' : 'expense'}
      </button>
    </form>
  )
}
