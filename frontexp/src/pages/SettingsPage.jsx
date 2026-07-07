import PageHeader from '../components/PageHeader.jsx'

export default function SettingsPage({ user, onLogout }) {
  return (
    <div className="page page-narrow">
      <PageHeader
        eyebrow="Account settings"
        title="Settings"
        description="Manage your session and account details."
      />

      <div className="card settings-card">
        <div className="settings-row">
          <span className="settings-label">Name</span>
          <span>{user?.name || 'Unknown'}</span>
        </div>
        <div className="settings-row">
          <span className="settings-label">Email</span>
          <span>{user?.email || 'Unknown'}</span>
        </div>

        <button type="button" className="submit-btn logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}
