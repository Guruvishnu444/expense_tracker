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
import {
  loadAuth,
  saveAuth,
  clearAuth,
  fetchEntries,
  createEntryRequest,
  deleteEntryRequest
} from './utils/api.js'
import './App.css'

function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default function App() {
  const [auth, setAuth] = useState(() => loadAuth())
  const [entries, setEntries] = useState([])
  const user = auth?.user

  useEffect(() => {
    if (!auth?.token) {
      setEntries([])
      return
    }

    fetchEntries()
      .then((data) => setEntries(data))
      .catch((error) => {
        if (error.status === 401) {
          handleLogout()
        }
      })
  }, [auth?.token])

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
    const authState = { user, token }
    saveAuth(authState)
    setAuth(authState)
  }

  function handleLogout() {
    clearAuth()
    setAuth(null)
    setEntries([])
  }

  async function handleAddEntry(entry) {
    try {
      const saved = await createEntryRequest(entry)
      setEntries((prev) => [saved, ...prev])
    } catch (error) {
      console.error('Failed to add entry', error)
    }
  }

  async function handleDeleteEntry(id) {
    try {
      await deleteEntryRequest(id)
      setEntries((prev) => prev.filter((e) => e._id !== id && e.id !== id))
    } catch (error) {
      console.error('Failed to delete entry', error)
    }
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
                element={
                  <ProtectedRoute user={user}>
                    <Dashboard entries={entries} totals={totals} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add"
                element={
                  <ProtectedRoute user={user}>
                    <AddEntryPage onAdd={handleAddEntry} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/transactions"
                element={
                  <ProtectedRoute user={user}>
                    <TransactionsPage entries={entries} onDelete={handleDeleteEntry} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports"
                element={
                  <ProtectedRoute user={user}>
                    <ReportsPage entries={entries} totals={totals} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute user={user}>
                    <SettingsPage user={user} onLogout={handleLogout} />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to={auth ? '/' : '/login'} replace />} />
            </Routes>
          </main>

          <footer className="app-footer">
            <span>Ledger · Daily Expense Analytics</span>
            <span>{auth ? 'Synced with your account' : 'Sign in to save data securely'}</span>
          </footer>
        </div>
      </div>
    </BrowserRouter>
  )
}
