import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import { loginRequest } from '../utils/api.js'

export default function LoginPage({ onLogin }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data = await loginRequest(form)
      onLogin(data.user, data.token)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page page-narrow">
      <PageHeader
        eyebrow="Welcome back"
        title="Login"
        description="Use your account to continue managing your expenses."
      />

      <form className="card form-card" onSubmit={handleSubmit}>
        <label className="field">
          <span>Email</span>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </label>

        <label className="field">
          <span>Password</span>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </label>

        {error && <p className="form-error">{error}</p>}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Signing in…' : 'Login'}
        </button>

        <p className="form-note">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  )
}
