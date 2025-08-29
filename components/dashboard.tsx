// components/dashboard.tsx
'use client'

import { Suspense } from 'react'
import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'

import ChartLoading from './chart-loading'
import FootprintChart from './charts/footprint-chart'
import OffsetChart from './charts/offset-chart'
import GoalChart from './charts/goal-chart'
import MonthlyTrendChart from './charts/monthly-trend-chart'
import CategoryBreakdownChart from './charts/category-breakdown'
import ScopeChart from './charts/scope-chart'
import SuggestionsChart from './charts/suggestions-chart'
import DemoFetchToggle from './demo-fetch-toggle'
import useDemoFetch from '@/hooks/use-demo-fetch'
import DemoFetchWrapper from './DemoFetchWrapper'

// tiny helper: wraps useSWR and passes data into children
function MetricsLoader({ children }: { children: (data: any) => React.ReactNode }) {
  const { clientOnly } = useDemoFetch()
  // use a different key when clientOnly so it DOESN'T match the SSR fallback
  const key = clientOnly ? '/api/metrics?demo=1' : '/api/metrics'
  const { data } = useSWR(key, fetcher, { suspense: true })
  return <>{children(data)}</>
}

export default function Dashboard() {
  return (
    <DemoFetchWrapper>
      <main className="container">
        <DemoFetchToggle />

        {/* Top row: footprint + offset + goal */}
        <div className="row g-3 my-2">
          <div className="col-12 col-md-6">
            <div className="row g-3">
              <div className="col-6 col-md-12">
                <Suspense fallback={<ChartLoading height={190} />}>
                  <MetricsLoader>
                    {(m) => (
                      <FootprintChart currentFootprint={m.currentFootprint} delta={m.delta} />
                    )}
                  </MetricsLoader>
                </Suspense>
              </div>
              <div className="col-6 col-md-12">
                <Suspense fallback={<ChartLoading height={190} />}>
                  <MetricsLoader>{(m) => <OffsetChart offset={m.offset} />}</MetricsLoader>
                </Suspense>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <Suspense fallback={<ChartLoading height={400} />}>
              <MetricsLoader>
                {(m) => <GoalChart progressPct={m.progressPct} gaugeData={m.gaugeData} />}
              </MetricsLoader>
            </Suspense>
          </div>
        </div>

        {/* Monthly trend */}
        <div className="row g-3 my-2">
          <div className="col-12">
            <Suspense fallback={<ChartLoading height={460} />}>
              <MetricsLoader>
                {(m) => (
                  <MonthlyTrendChart progressPct={m.progressPct} monthlyTrend={m.monthlyTrend} />
                )}
              </MetricsLoader>
            </Suspense>
          </div>
        </div>

        {/* Category breakdown + scopes */}
        <div className="row g-3 my-2">
          <div className="col-12 col-lg-4 col-md-6">
            <Suspense fallback={<ChartLoading height={400} />}>
              <MetricsLoader>
                {(m) => <CategoryBreakdownChart categoryBreakdown={m.categoryBreakdown} />}
              </MetricsLoader>
            </Suspense>
          </div>
          <div className="col-12 col-lg-8 col-md-6">
            <Suspense fallback={<ChartLoading height={400} />}>
              <MetricsLoader>{(m) => <ScopeChart scope={m.scopeBars} />}</MetricsLoader>
            </Suspense>
          </div>
        </div>

        {/* Suggestions */}
        <div className="row g-3 my-2">
          <div className="col-12 col-md-8">
            <SuggestionsChart />
          </div>
        </div>
      </main>
    </DemoFetchWrapper>
  )
}
