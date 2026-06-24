import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', hint: 'Overview', dot: '#d8b26a' },
  { to: '/add', label: 'Add entry', hint: 'Income & expense', dot: '#3ddc9a' },
  { to: '/transactions', label: 'Transactions', hint: 'Full history', dot: '#f2667a' },
  { to: '/reports', label: 'Reports', hint: 'Trends & charts', dot: '#7c9bf2' }
]

export default function Sidebar() {
  return (
    <nav className="ledger-sidebar" aria-label="Main navigation">
      <div className="sidebar-mark">
        <span className="ledger-mark-tick" />
        <span className="ledger-mark-text">Ledger</span>
      </div>

      <ul className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `sidebar-link${isActive ? ' is-active' : ''}`}
            >
              <span className="sidebar-link-dot" style={{ background: item.dot }} />
              <span className="sidebar-link-text">
                <span className="sidebar-link-label">{item.label}</span>
                <span className="sidebar-link-hint">{item.hint}</span>
              </span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="sidebar-foot">
        <span>Expense data</span>
      </div>
    </nav>
  )
}
