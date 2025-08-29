"use client"

import FootprintChart from "./charts/footprint-chart"
import OffsetChart from "./charts/offset-chart"
import GoalChart from "./charts/goal-chart"
import MonthlyTrendChart from "./charts/monthly-trend-chart"
import CategoryBreakdownChart from "./charts/category-breakdown"
import ScopeChart from "./charts/scope-chart"
import SuggestionsChart from "./charts/suggestions-chart"
import { fetcher } from "@/lib/fetcher"
import useSWR from "swr"
import { Summary } from "@/models/api/summary.model"
import { GaugeData } from "@/models/api/gauge.model"
import { MonthlyTrend } from "@/models/api/monthly-trend.model"
import { CategoryBreakdown } from "@/models/api/category-breakdown"
import ChartLoading from "./chart-loading"
import { Suspense } from "react"

function FootprintLoader() {
    const data = useSWR("/api/summary", fetcher, { suspense: true }).data as Summary
    return (
        <FootprintChart
            currentFootprint={data.currentFootprint}
            delta={data.delta}
        />
    )
}

function OffsetLoader() {
    const data = useSWR("/api/summary", fetcher, { suspense: true }).data as Summary
    return <OffsetChart offset={data.offset} />
}

function GoalLoader() {
    const gauge = useSWR("/api/gauge", fetcher, { suspense: true }).data as GaugeData[]

    const progressPct = gauge?.[0]?.value ?? 0
    return (
        <GoalChart
            progressPct={progressPct}
            gaugeData={gauge}
        />
    )
}

function MonthlyTrendLoader() {
    const monthlyTrend = useSWR("/api/monthly-trend", fetcher, {
        suspense: true,
    }).data as MonthlyTrend[]

    // If your chart also needs a percentage, grab from /api/summary:
    const summary = useSWR("/api/summary", fetcher, { suspense: true }).data as {
        progressPct: number
    }

    return (
        <MonthlyTrendChart
            progressPct={summary.progressPct}
            monthlyTrend={monthlyTrend}
        />
    )
}

function CategoryBreakdownLoader() {
    const categoryBreakdown = useSWR("/api/category-breakdown", fetcher, {
        suspense: true,
    }).data as CategoryBreakdown[]

    return <CategoryBreakdownChart categoryBreakdown={categoryBreakdown} />
}

function ScopeLoader() {
    // /api/scopes -> [{ scope, value }]
    const scope = useSWR("/api/scopes", fetcher, { suspense: true }).data as Array<{
        scope: string
        value: number
    }>

    return <ScopeChart scope={scope} />
}

export default function Dashboard() {
    return (
        <main className='container'>
            <div className='row'>
                <div className='col-12 col-md-6'>
                    <div className='row'>
                        <div className='col-6 col-md-12 g-3'>
                            <Suspense fallback={<ChartLoading height={180} />}>
                                <FootprintLoader />
                            </Suspense>
                        </div>
                        <div className='col-6 col-md-12 g-3'>
                            <Suspense fallback={<ChartLoading height={180} />}>
                                <OffsetLoader />
                            </Suspense>
                        </div>
                    </div>
                </div>
                <div className='col-12 col-md-6 g-3'>
                    <Suspense fallback={<ChartLoading height={380} />}>
                        <GoalLoader />
                    </Suspense>
                </div>
            </div>
            <div className='row'>
                <div className='col-12 g-3'>
                    <Suspense fallback={<ChartLoading height={460} />}>
                        <MonthlyTrendLoader />
                    </Suspense>
                </div>
            </div>

            <div className='row'>
                <div className='col-12 col-lg-4 col-md-6 g-3'>
                    <Suspense fallback={<ChartLoading height={420} />}>
                        <CategoryBreakdownLoader />
                    </Suspense>
                </div>
                <div className='col-12 col-lg-8 col-md-6 g-3'>
                    <Suspense fallback={<ChartLoading height={420} />}>
                        <ScopeLoader />
                    </Suspense>
                </div>
            </div>
            <div className='row'>
                <div className='col-12 col-md-8 g-3'>
                    <SuggestionsChart />
                </div>
            </div>
        </main>
    )
}
