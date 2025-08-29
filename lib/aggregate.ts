import { EmissionEntry } from '@/models/emissions'

export function aggregateByMonth(entries: EmissionEntry[]) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const acc = new Map<string, number>()
  for (const e of entries) {
    const d = new Date(e.date)
    const key = months[d.getMonth()]
    acc.set(key, (acc.get(key) ?? 0) + e.amount)
  }
  return months.map((m) => ({ month: m, co2: acc.get(m) ?? 0 }))
}

export function aggregateByCategory(entries: EmissionEntry[]) {
  const cats = ['Energy', 'Transport', 'Food', 'Purchases', 'Waste']
  const acc = new Map<string, number>()
  for (const e of entries) acc.set(e.category, (acc.get(e.category) ?? 0) + e.amount)
  return cats.map((c) => ({ name: c, value: acc.get(c) ?? 0 }))
}

export function aggregateByScope(entries: EmissionEntry[]) {
  const scopes = ['Scope 1', 'Scope 2', 'Scope 3']
  const acc = new Map<string, number>()
  for (const e of entries) acc.set(e.scope, (acc.get(e.scope) ?? 0) + e.amount)
  return scopes.map((s) => ({ scope: s, value: acc.get(s) ?? 0 }))
}

export function computeSummary(entries: EmissionEntry[]) {
  // naive month split: current calendar month vs previous calendar month
  const now = new Date()
  const thisMonth = now.getMonth()
  const prevMonth = (thisMonth + 11) % 12

  let currentFootprint = 0
  let lastMonth = 0

  for (const e of entries) {
    const d = new Date(e.date)
    if (d.getFullYear() === now.getFullYear() && d.getMonth() === thisMonth)
      currentFootprint += e.amount
    if (
      (d.getFullYear() === now.getFullYear() && d.getMonth() === prevMonth) ||
      (prevMonth === 11 && d.getFullYear() === now.getFullYear() - 1 && d.getMonth() === prevMonth)
    )
      lastMonth += e.amount
  }

  const goal = Math.max(1, Math.round(currentFootprint * 0.9)) // demo goal = 10% below current
  const delta = currentFootprint - lastMonth
  const progressPct = Math.min(100, Math.round((goal / currentFootprint) * 100))
  const offset = 120

  return {
    currentFootprint: Math.round(currentFootprint),
    lastMonth: Math.round(lastMonth),
    delta,
    goal,
    progressPct,
    offset,
  }
}
