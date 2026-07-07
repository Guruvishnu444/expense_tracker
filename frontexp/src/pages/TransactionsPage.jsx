import PageHeader from '../components/PageHeader.jsx'
import TransactionTable from '../components/TransactionTable.jsx'

export default function TransactionsPage({ entries, onDelete }) {
  return (
    <div className="page">
      <PageHeader
        eyebrow="Full history"
        title="Transactions"
        description="Every entry you've logged, searchable and filterable."
      />

      <TransactionTable entries={entries} onDelete={onDelete} />
    </div>
  )
}
