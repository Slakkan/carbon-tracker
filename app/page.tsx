import SWRProvider from '@/components/swr-provider'

// read + aggregate directly on the server
import { readEntries } from '@/lib/db'
import {
  aggregateByMonth,
  aggregateByCategory,
  aggregateByScope,
  computeSummary,
} from '@/lib/aggregate'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { seedIfEmpty } from '@/lib/seed'

export default async function Page() {
  await seedIfEmpty() // make sure there is data before aggregation
  const entries = await readEntries()

  const monthlyTrend = aggregateByMonth(entries)
  const categoryBreakdown = aggregateByCategory(entries)
  const scopeBars = aggregateByScope(entries)
  const summary = computeSummary(entries)
  const gaugeData = [{ name: 'progress', value: summary.progressPct, fill: '#78BE20' }]

  // Build the fallback cache keyed by the URLs your client uses with useSWR
  const fallback = {
    '/api/metrics': {
      monthlyTrend,
      categoryBreakdown,
      scopeBars,
      gaugeData,
      ...summary,
    },
  }

  const Dashboard = (await import('@/components/dashboard')).default

  return (
    <>
      <Header />
      <SWRProvider fallback={fallback}>
        <Dashboard />
      </SWRProvider>
      <Footer />
    </>
  )
}
