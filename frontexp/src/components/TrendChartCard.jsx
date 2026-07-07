import { useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { formatCompact, formatCurrency } from '../utils/format.js'

const DAYS_WINDOW = 14

export default function TrendChartCard({ entries }) {
  const data = useMemo(() => {
    const days = []
    const today = new Date()
    for (let i = DAYS_WINDOW - 1; i >= 0; i--) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      const key = d.toISOString().slice(0, 10)
      days.push({
        key,
        label: new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short' }).format(d),
        income: 0,
        expense: 0
      })
    }
    const byDay = Object.fromEntries(days.map((d) => [d.key, d]))
    for (const e of entries) {
      const row = byDay[e.date]
      if (!row) continue
      if (e.type === 'income') row.income += Number(e.amount)
      else row.expense += Number(e.amount)
    }
    return days
  }, [entries])

  return (
    <section className="card chart-card">
      <div className="card-head">
        <h3>14-day trend</h3>
        <span className="card-head-hint">Income vs expense</span>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data} margin={{ top: 6, right: 8, left: -18, bottom: 0 }}>
          <defs>
            <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3ddc9a" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#3ddc9a" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="expenseFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f2667a" stopOpacity={0.32} />
              <stop offset="100%" stopColor="#f2667a" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#1f232f" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: '#565b6e', fontSize: 11 }}
            axisLine={{ stroke: '#262b3a' }}
            tickLine={false}
            interval={1}
          />
          <YAxis
            tick={{ fill: '#565b6e', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => formatCompact(v)}
            width={48}
          />
          <Tooltip
            formatter={(value, name) => [formatCurrency(value), name === 'income' ? 'Income' : 'Expense']}
            contentStyle={{
              background: '#1b1f2c',
              border: '1px solid #262b3a',
              borderRadius: 10,
              color: '#edeff4',
              fontSize: 12
            }}
            labelStyle={{ color: '#8a8fa3' }}
          />
          <Area type="monotone" dataKey="income" stroke="#3ddc9a" fill="url(#incomeFill)" strokeWidth={2} />
          <Area type="monotone" dataKey="expense" stroke="#f2667a" fill="url(#expenseFill)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </section>
  )
}
