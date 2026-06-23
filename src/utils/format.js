// Formatting helpers kept in one place so number/date
// presentation stays consistent across every component.

export function formatCurrency(value, { sign = false } = {}) {
  const amount = Number(value) || 0
  const formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(Math.abs(amount))

  if (!sign) return formatted
  return amount < 0 ? `-${formatted}` : `+${formatted}`
}

export function formatCompact(value) {
  const amount = Number(value) || 0
  return new Intl.NumberFormat('en-IN', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(amount)
}

export function formatDate(dateStr) {
  const d = new Date(dateStr)
  return new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short' }).format(d)
}

export function formatDateLong(dateStr) {
  const d = new Date(dateStr)
  return new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).format(d)
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

export function monthLabel(dateStr) {
  const d = new Date(dateStr)
  return new Intl.DateTimeFormat('en-IN', { month: 'short' }).format(d)
}
