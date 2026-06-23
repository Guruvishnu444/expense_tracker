import PageHeader from '../components/PageHeader.jsx'
import PieChartCard from '../components/PieChartCard.jsx'
import TrendChartCard from '../components/TrendChartCard.jsx'
import CategoryBreakdown from '../components/CategoryBreakdown.jsx'

export default function ReportsPage({ entries, totals }) {
  return (
    <div className="page">
      <PageHeader
        eyebrow="Trends & charts"
        title="Reports"
        description="See how your spending shifts day to day and category to category."
      />

      <section className="grid-two">
        <PieChartCard entries={entries} />
        <TrendChartCard entries={entries} />
      </section>

      <CategoryBreakdown entries={entries} totals={totals} />
    </div>
  )
}
