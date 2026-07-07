import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header.jsx'
import Sidebar from './components/Sidebar.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AddEntryPage from './pages/AddEntryPage.jsx'
import TransactionsPage from './pages/TransactionsPage.jsx'
import ReportsPage from './pages/ReportsPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import './App.css'

// ALWAYS PERMIT ROUTING ACCESS
function ProtectedRoute({ children }) {
  return children
}

export default function App() {
  // Mock a user session right out of the box
  const [auth, setAuth] = useState({
    user: { name: 'Guest User', email: 'guest@example.com' },
    token: 'mock-local-token'
  })

  // Pre-populate with realistic mock entries so graphs and tables render beautifully
  const [entries, setEntries] = useState([
    { _id: '1', title: 'Salary Credit', amount: 5000, type: 'income', category: 'Salary', date: '2026-07-01' },
    { _id: '2', title: 'Supermarket Groceries', amount: 150, type: 'expense', category: 'Food', date: '2026-07-02' },
    { _id: '3', title: 'Electric Bill', amount: 85, type: 'expense', category: 'Utilities', date: '2026-07-04' },
    { _id: '4', title: 'Freelance Design', amount: 650, type: 'income', category: 'Freelance', date: '2026-07-05' },
    { _id: '5', title: 'Coffee & Snacks', amount: 12, type: 'expense', category: 'Food', date: '2026-07-06' }
  ])

  const user = auth?.user

  // Calculate local totals dynamically based on our state arrays
  const totals = useMemo(() => {
    let income = 0
    let expense = 0
    for (const e of entries) {
      if (e.type === 'income') income += Number(e.amount)
      else expense += Number(e.amount)
    }
    return { income, expense, balance: income - expense }
  }, [entries])

  function handleLogin(user, token) {
    setAuth({ user, token })
  }

  function handleLogout() {
    setAuth(null)
    setEntries([])
  }

  // Intercept backend creation and handle it client-side inside the state
  async function handleAddEntry(entry) {
    const mockSavedEntry = {
      ...entry,
      _id: String(Date.now()), // Generate a virtual ID timestamp
      date: entry.date || new Date().toISOString().split('T')[0]
    }
    setEntries((prev) => [mockSavedEntry, ...prev])
  }

  // Intercept backend deletions and filter them locally from state array
  async function handleDeleteEntry(id) {
    setEntries((prev) => prev.filter((e) => e._id !== id && e.id !== id))
  }

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Sidebar />

        <div className="app-body">
          <Header />

          <main className="app-main">
            <Routes>
              <Route
                path="/login"
                element={auth ? <Navigate to="/" replace /> : <LoginPage onLogin={handleLogin} />}
              />
              <Route
                path="/register"
                element={auth ? <Navigate to="/" replace /> : <RegisterPage onLogin={handleLogin} />}
              />
              <Route
                path="/"
                element = {
                  <ProtectedRoute>
                    <Dashboard entries={entries} totals={totals} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add"
                element={
                  <ProtectedRoute>
                    <AddEntryPage onAdd={handleAddEntry} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/transactions"
                element={
                  <ProtectedRoute>
                    <TransactionsPage entries={entries} onDelete={handleDeleteEntry} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports"
                element={
                  <ProtectedRoute>
                    <ReportsPage entries={entries} totals={totals} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <SettingsPage user={user} onLogout={handleLogout} />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to={auth ? '/' : '/login'} replace />} />
            </Routes>
          </main>

          <footer className="app-footer">
            <span>Ledger · Daily Expense Analytics</span>
            <span>Standalone Demo Sandbox Mode</span>
          </footer>
        </div>
      </div>
    </BrowserRouter>
  )
}
