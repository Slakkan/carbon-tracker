import { EmissionEntry } from '@/models/emissions'

export function generateSeed(year = new Date().getFullYear()): EmissionEntry[] {
  const categories = ['Energy', 'Transport', 'Food', 'Purchases', 'Waste'] as const
  const scopes = ['Scope 1', 'Scope 2', 'Scope 3'] as const

  const totalsPerMonth = Array.from({ length: 12 }, (_, m) => {
    // seasonality: peak in Jul/Aug, trough in Jan/Feb
    const base = 180 + 140 * Math.sin(((m - 1) / 11) * Math.PI) // 180..320 approx
    const noise = (Math.random() - 0.5) * 30
    return Math.max(80, Math.round(base + noise))
  })

  const entries: EmissionEntry[] = []
  for (let m = 0; m < 12; m++) {
    // split the monthly total into 2–3 entries
    const parts = Math.random() < 0.6 ? 2 : 3
    let remaining = totalsPerMonth[m]
    for (let p = 0; p < parts; p++) {
      const amount =
        p === parts - 1
          ? remaining
          : Math.max(20, Math.round((remaining / (parts - p)) * (0.6 + Math.random() * 0.6)))
      remaining -= amount
      const day = 5 + p * 7 + Math.floor(Math.random() * 5)
      const category = categories[(m + p) % categories.length]
      const scope = category === 'Energy' ? 'Scope 2' : 'Scope 3'

      entries.push({
        id: `seed-${year}-${m + 1}-${p + 1}`,
        date: new Date(year, m, Math.min(day, 28)).toISOString().slice(0, 10),
        category,
        scope,
        amount,
        note: 'auto-seeded',
      })
    }
  }
  return entries
}
