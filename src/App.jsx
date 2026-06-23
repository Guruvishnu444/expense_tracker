import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Sidebar from './components/Sidebar.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AddEntryPage from './pages/AddEntryPage.jsx'
import TransactionsPage from './pages/TransactionsPage.jsx'
import ReportsPage from './pages/ReportsPage.jsx'
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
    <BrowserRouter>
      <div className="app-shell">
        <Sidebar />

        <div className="app-body">
          <Header />

          <main className="app-main">
            <Routes>
              <Route path="/" element={<Dashboard entries={entries} totals={totals} />} />
              <Route path="/add" element={<AddEntryPage onAdd={addEntry} />} />
              <Route
                path="/transactions"
                element={<TransactionsPage entries={entries} onDelete={deleteEntry} />}
              />
              <Route path="/reports" element={<ReportsPage entries={entries} totals={totals} />} />
            </Routes>
          </main>

          <footer className="app-footer">
            <span>Ledger · Daily Expense Analytics</span>
            <span>Your data stays on this device</span>
          </footer>
        </div>
      </div>
    </BrowserRouter>
  )
}
