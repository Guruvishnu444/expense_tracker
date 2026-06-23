import { useMemo, useState } from 'react'
import { getCategoryMeta } from '../data/categories.js'
import { formatCurrency, formatDateLong } from '../utils/format.js'

export default function TransactionTable({ entries, onDelete }) {
  const [filter, setFilter] = useState('all')

  const rows = useMemo(() => {
    const sorted = [...entries].sort((a, b) => new Date(b.date) - new Date(a.date))
    if (filter === 'all') return sorted
    return sorted.filter((e) => e.type === filter)
  }, [entries, filter])

  return (
    <section className="card table-card">
      <div className="card-head">
        <h3>Transactions</h3>
        <div className="filter-pills" role="group" aria-label="Filter transactions">
          {['all', 'income', 'expense'].map((f) => (
            <button
              key={f}
              className={filter === f ? 'pill is-active' : 'pill'}
              onClick={() => setFilter(f)}
              type="button"
            >
              {f === 'all' ? 'All' : f === 'income' ? 'Income' : 'Expense'}
            </button>
          ))}
        </div>
      </div>

      {rows.length === 0 ? (
        <p className="empty-note">No transactions in this view.</p>
      ) : (
        <div className="table-scroll">
          <table className="ledger-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Note</th>
                <th className="align-right">Amount</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {rows.map((e) => {
                const meta = getCategoryMeta(e.type, e.category)
                const isIncome = e.type === 'income'
                return (
                  <tr key={e.id}>
                    <td className="text-dim">{formatDateLong(e.date)}</td>
                    <td>
                      <span className="table-category">
                        <span className="breakdown-swatch" style={{ background: meta.color }} />
                        {meta.label}
                      </span>
                    </td>
                    <td className="text-dim">{e.note || '—'}</td>
                    <td className={`align-right mono amount-cell ${isIncome ? 'is-income' : 'is-expense'}`}>
                      {isIncome ? '+' : '-'}
                      {formatCurrency(e.amount)}
                    </td>
                    <td className="align-right">
                      <button
                        className="row-delete"
                        type="button"
                        onClick={() => onDelete(e.id)}
                        aria-label={`Delete entry: ${meta.label}`}
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
