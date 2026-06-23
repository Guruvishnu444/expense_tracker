import { formatCurrency } from '../utils/format.js'

export default function BalanceHero({ totals }) {
  const { income, expense, balance } = totals
  const isPositive = balance >= 0

  return (
    <section className="hero-card">
      <div className="hero-perforation" aria-hidden="true">
        {Array.from({ length: 28 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>

      <div className="hero-top">
        <span className="hero-eyebrow">Current balance</span>
        <span className={`hero-trend ${isPositive ? 'is-up' : 'is-down'}`}>
          {isPositive ? '▲ in the green' : '▼ in the red'}
        </span>
      </div>

      <div className="hero-balance">
        <span className="hero-currency">₹</span>
        <span className="hero-number">
          {formatCurrency(Math.abs(balance)).replace('₹', '')}
        </span>
      </div>

      <div className="hero-ledger-line" aria-hidden="true" />

      <div className="hero-stats">
        <div className="hero-stat">
          <span className="hero-stat-dot dot-income" />
          <div>
            <span className="hero-stat-label">Income</span>
            <span className="hero-stat-value mono">{formatCurrency(income)}</span>
          </div>
        </div>
        <div className="hero-stat">
          <span className="hero-stat-dot dot-expense" />
          <div>
            <span className="hero-stat-label">Expense</span>
            <span className="hero-stat-value mono">{formatCurrency(expense)}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
