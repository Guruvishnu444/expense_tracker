import { useEffect, useState } from 'react'

function getGreeting(hour) {
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function Header() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000)
    return () => clearInterval(t)
  }, [])

  const dateLabel = new Intl.DateTimeFormat('en-IN', {
    weekday: 'long',
    day: '2-digit',
    month: 'long'
  }).format(now)

  return (
    <header className="ledger-header">
      <div className="ledger-mark">
        <span className="ledger-mark-tick" />
        <span className="ledger-mark-text">Ledger</span>
      </div>

      <div className="ledger-header-meta">
        <span className="ledger-greeting">{getGreeting(now.getHours())}</span>
        <span className="ledger-date">{dateLabel}</span>
      </div>
    </header>
  )
}
