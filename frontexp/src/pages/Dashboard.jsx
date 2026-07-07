import PageHeader from '../components/PageHeader.jsx'
import BalanceHero from '../components/BalanceHero.jsx'
import CategoryBreakdown from '../components/CategoryBreakdown.jsx'
import PieChartCard from '../components/PieChartCard.jsx'

export default function Dashboard({ entries, totals }) {
  return (
    <div className="page">
      <PageHeader
        eyebrow="Overview"
        title="Dashboard"
        description="Your balance, income and spend at a glance."
      />

      <BalanceHero totals={totals} />

      <section className="grid-two">
        <CategoryBreakdown entries={entries} totals={totals} />
        <PieChartCard entries={entries} />
      </section>
    </div>
  )
}
