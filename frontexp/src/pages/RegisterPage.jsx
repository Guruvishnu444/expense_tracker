import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import { registerRequest } from '../utils/api.js'

export default function RegisterPage({ onLogin }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data = await registerRequest(form)
      onLogin(data.user, data.token)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page page-narrow">
      <PageHeader
        eyebrow="Create account"
        title="Register"
        description="Register a new account and sync entries with MongoDB."
      />

      <form className="card form-card" onSubmit={handleSubmit}>
        <label className="field">
          <span>Name</span>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </label>

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
          {loading ? 'Creating account…' : 'Register'}
        </button>

        <p className="form-note">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  )
}
