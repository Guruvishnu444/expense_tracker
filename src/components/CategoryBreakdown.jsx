import { useMemo } from 'react'
import { EXPENSE_CATEGORIES } from '../data/categories.js'
import { formatCurrency } from '../utils/format.js'

export default function CategoryBreakdown({ entries, totals }) {
  const rows = useMemo(() => {
    const sums = {}
    for (const e of entries) {
      if (e.type !== 'expense') continue
      sums[e.category] = (sums[e.category] || 0) + Number(e.amount)
    }
    return EXPENSE_CATEGORIES.map((c) => ({ ...c, amount: sums[c.id] || 0 }))
      .filter((c) => c.amount > 0)
      .sort((a, b) => b.amount - a.amount)
  }, [entries])

  const maxAmount = rows.length ? rows[0].amount : 0

  return (
    <section className="card">
      <div className="card-head">
        <h3>Category breakdown</h3>
        <span className="card-head-hint">{formatCurrency(totals.expense)} spent</span>
      </div>

      {rows.length === 0 ? (
        <p className="empty-note">No expenses logged yet — add one to see it here.</p>
      ) : (
        <ul className="breakdown-list">
          {rows.map((c) => {
            const pct = totals.expense ? Math.round((c.amount / totals.expense) * 100) : 0
            return (
              <li key={c.id} className="breakdown-row">
                <div className="breakdown-row-top">
                  <span className="breakdown-label">
                    <span className="breakdown-swatch" style={{ background: c.color }} />
                    {c.label}
                  </span>
                  <span className="breakdown-amount mono">{formatCurrency(c.amount)}</span>
                </div>
                <div className="breakdown-bar-track">
                  <div
                    className="breakdown-bar-fill"
                    style={{
                      width: `${Math.max(4, (c.amount / (maxAmount || 1)) * 100)}%`,
                      background: c.color
                    }}
                  />
                </div>
                <span className="breakdown-pct">{pct}% of spend</span>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
