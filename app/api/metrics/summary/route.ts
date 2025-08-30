// app/api/metrics/summary/route.ts
import { NextResponse } from 'next/server'
import { readEntries } from '@/lib/db'
import { seedIfEmpty } from '@/lib/seed'
import {
  aggregateByMonth,
  aggregateByCategory,
  aggregateByScope,
  computeSummary,
} from '@/lib/aggregate'
import { sleep } from '@/lib/utils'

export const revalidate = 0

export async function GET() {
  await sleep(800, 1800)
  await seedIfEmpty()
  const entries = await readEntries()
  const monthlyTrend = aggregateByMonth(entries)
  const categoryBreakdown = aggregateByCategory(entries)
  const scopeBars = aggregateByScope(entries)
  const summary = computeSummary(entries)
  const gaugeData = [{ name: 'progress', value: summary.progressPct, fill: '#78BE20' }]
  return NextResponse.json({ monthlyTrend, categoryBreakdown, scopeBars, gaugeData, ...summary })
}
