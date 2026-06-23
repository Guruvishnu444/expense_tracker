import { useMemo } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { EXPENSE_CATEGORIES } from '../data/categories.js'
import { formatCurrency } from '../utils/format.js'

export default function PieChartCard({ entries }) {
  const data = useMemo(() => {
    const sums = {}
    for (const e of entries) {
      if (e.type !== 'expense') continue
      sums[e.category] = (sums[e.category] || 0) + Number(e.amount)
    }
    return EXPENSE_CATEGORIES.map((c) => ({ name: c.label, value: sums[c.id] || 0, color: c.color })).filter(
      (c) => c.value > 0
    )
  }, [entries])

  const total = data.reduce((s, d) => s + d.value, 0)

  return (
    <section className="card chart-card">
      <div className="card-head">
        <h3>Spend by category</h3>
        <span className="card-head-hint">Share of total expense</span>
      </div>

      {data.length === 0 ? (
        <p className="empty-note">Nothing to chart yet.</p>
      ) : (
        <div className="pie-wrap">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={62}
                outerRadius={92}
                paddingAngle={2}
                stroke="none"
              >
                {data.map((d) => (
                  <Cell key={d.name} fill={d.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => formatCurrency(value)}
                contentStyle={{
                  background: '#1b1f2c',
                  border: '1px solid #262b3a',
                  borderRadius: 10,
                  color: '#edeff4',
                  fontSize: 12
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="pie-center">
            <span className="pie-center-label">Total</span>
            <span className="pie-center-value mono">{formatCurrency(total)}</span>
          </div>
        </div>
      )}

      {data.length > 0 && (
        <ul className="legend-list">
          {data.map((d) => (
            <li key={d.name}>
              <span className="legend-dot" style={{ background: d.color }} />
              {d.name}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
