// lib/aggregate.ts
export type Entry = {
  id: string
  date: string // "YYYY-MM-DD"
  category: string
  scope: 'Scope 1' | 'Scope 2' | 'Scope 3'
  amount: number
  note?: string
}

export function aggregateByMonth(entries: Entry[]) {
  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth() - 11, 1) // 11 months back
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 1) // exclusive

  // build labels for each month between start..end
  const buckets: { month: string; co2: number }[] = []
  for (let i = 0; i < 12; i++) {
    const d = new Date(start.getFullYear(), start.getMonth() + i, 1)
    buckets.push({
      month: d.toLocaleString('de-DE', { month: 'short' }), // consistent with your EU formatting
      co2: 0,
    })
  }

  entries.forEach((e) => {
    const d = new Date(e.date)
    if (d >= start && d < end) {
      const index = (d.getFullYear() - start.getFullYear()) * 12 + (d.getMonth() - start.getMonth())
      if (index >= 0 && index < buckets.length) buckets[index].co2 += e.amount
    }
  })

  return buckets
}

export function aggregateByCategory(entries: Entry[]) {
  const map = new Map<string, number>()
  entries.forEach((e) => map.set(e.category, (map.get(e.category) ?? 0) + e.amount))
  return Array.from(map, ([name, value]) => ({ name, value }))
}

export function aggregateByScope(entries: Entry[]) {
  const scopes: Record<Entry['scope'], number> = { 'Scope 1': 0, 'Scope 2': 0, 'Scope 3': 0 }
  entries.forEach((e) => {
    scopes[e.scope] += e.amount
  })
  return Object.entries(scopes).map(([scope, value]) => ({ scope, value }))
}

export function computeSummary(entries: Entry[]) {
  const now = new Date()
  const ym = (d: Date) => `${d.getFullYear()}-${d.getMonth()}`
  const currKey = ym(now)
  const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const prevKey = ym(prev)

  let currentFootprint = 0
  let lastMonth = 0
  let offset = 0

  entries.forEach((e) => {
    const d = new Date(e.date)
    const key = ym(d)

    if (key === currKey) {
      currentFootprint += e.amount
      // offsets = negative amounts OR category starting with "offset"
      if (e.amount < 0 || /^offset/i.test(e.category ?? '')) {
        offset += Math.abs(e.amount)
      }
    }
    if (key === prevKey) lastMonth += e.amount
  })

  const delta = currentFootprint - lastMonth

  // Target = 10% lower than last month
  const goal = Math.max(0, Math.round(lastMonth * 0.9))
  const targetReduction = Math.max(0, lastMonth - goal)

  const netCurrent = Math.max(0, currentFootprint - offset)
  const achieved = Math.max(0, lastMonth - netCurrent)

  const progressPct =
    targetReduction > 0 ? Math.min(100, Math.round((achieved / targetReduction) * 100)) : 100

  return { currentFootprint, lastMonth, delta, goal, progressPct, offset }
}
