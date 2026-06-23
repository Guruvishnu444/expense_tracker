import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import BalanceHero from './components/BalanceHero.jsx'
import AddEntryForm from './components/AddEntryForm.jsx'
import CategoryBreakdown from './components/CategoryBreakdown.jsx'
import PieChartCard from './components/PieChartCard.jsx'
import TrendChartCard from './components/TrendChartCard.jsx'
import TransactionTable from './components/TransactionTable.jsx'
import { loadEntries, saveEntries } from './utils/storage.js'
import './App.css'

export default function App() {
  const [entries, setEntries] = useState(() => loadEntries())

  useEffect(() => {
    saveEntries(entries)
  }, [entries])

  const totals = useMemo(() => {
    let income = 0
    let expense = 0
    for (const e of entries) {
      if (e.type === 'income') income += Number(e.amount)
      else expense += Number(e.amount)
    }
    return { income, expense, balance: income - expense }
  }, [entries])

  function addEntry(entry) {
    setEntries((prev) => [{ ...entry, id: crypto.randomUUID() }, ...prev])
  }

  function deleteEntry(id) {
    setEntries((prev) => prev.filter((e) => e.id !== id))
  }

  return (
    <div className="app-shell">
      <Header />

      <main className="app-main">
        <BalanceHero totals={totals} />

        <section className="grid-two">
          <AddEntryForm onAdd={addEntry} />
          <CategoryBreakdown entries={entries} totals={totals} />
        </section>

        <section className="grid-two">
          <PieChartCard entries={entries} />
          <TrendChartCard entries={entries} />
        </section>

        <section>
          <TransactionTable entries={entries} onDelete={deleteEntry} />
        </section>
      </main>

      <footer className="app-footer">
        <span>Ledger · Daily Expense Analytics</span>
        <span>Your data stays on this device</span>
      </footer>
    </div>
  )
}
