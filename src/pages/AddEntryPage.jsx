import PageHeader from '../components/PageHeader.jsx'
import AddEntryForm from '../components/AddEntryForm.jsx'

export default function AddEntryPage({ onAdd }) {
  return (
    <div className="page page-narrow">
      <PageHeader
        eyebrow="Log a transaction"
        title="Add entry"
        description="Record income or an expense — it shows up on your dashboard instantly."
      />

      <AddEntryForm onAdd={onAdd} />
    </div>
  )
}
