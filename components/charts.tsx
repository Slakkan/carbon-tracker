"use client"

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    Legend,
    RadialBarChart,
    RadialBar,
} from "recharts"

import styles from "./charts.module.scss"
import KPICard from "./kpi-card"

// --- Brand palette ---
const COLORS = {
    deepBlue: "#005A9C",
    brightGreen: "#78BE20",
    lightSky: "#A6DAF1",
    orange: "#FF6F3C",
    white: "#FFFFFF",
    gray100: "#f5f5f5",
    gray700: "#374151",
}

// --- Mock data ---
const monthlyTrend = [
    { month: "Jan", co2: 820 },
    { month: "Feb", co2: 790 },
    { month: "Mar", co2: 760 },
    { month: "Apr", co2: 740 },
    { month: "May", co2: 715 },
    { month: "Jun", co2: 690 },
    { month: "Jul", co2: 670 },
    { month: "Aug", co2: 650 },
    { month: "Sep", co2: 640 },
    { month: "Oct", co2: 630 },
    { month: "Nov", co2: 625 },
    { month: "Dec", co2: 610 },
]

const categoryBreakdown = [
    { name: "Energy", value: 310 },
    { name: "Transport", value: 210 },
    { name: "Food", value: 120 },
    { name: "Purchases", value: 90 },
    { name: "Waste", value: 40 },
]

const scopeBars = [
    { scope: "Scope 1", value: 180 },
    { scope: "Scope 2", value: 250 },
    { scope: "Scope 3", value: 260 },
]

const currentFootprint = 610
const lastMonth = 630
const delta = currentFootprint - lastMonth
const goal = 550
const progressPct = Math.min(100, Math.round((goal / currentFootprint) * 100))
const offset = 120

const gaugeData = [{ name: "progress", value: progressPct, fill: COLORS.brightGreen }]

export default function Charts() {
    return (
        <main className='container'>
            <div className='row'>
                <div className='col-12 col-md-6'>
                    <div className='row'>
                        <div className='col-6 col-md-12 g-3'>
                            <KPICard
                                className={styles.chartSmall}
                                title='Total CO₂e (this month)'
                                value={currentFootprint.toLocaleString()}
                                suffix='kg'
                                content={
                                    <div className={styles.delta + " mt-2"}>
                                        {delta <= 0
                                            ? `▼ ${Math.abs(delta)} kg vs last month`
                                            : `▲ ${delta} kg vs last month`}
                                    </div>
                                }
                            />
                        </div>
                        <div className='col-6 col-md-12 g-3'>
                            <KPICard
                                className={styles.chartSmall}
                                title='Offsets Applied'
                                value={offset.toLocaleString()}
                                suffix='kg'
                                content={
                                    <>
                                        <div className='badge badge--accent me-2 mt-2'>Project: Forest</div>
                                        <div className='badge badge--accent me-2 mt-2'>Project: Renewables</div>
                                    </>
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className='col-12 col-md-6 g-3'>
                    <KPICard
                        title='Goal Progress'
                        value={`${progressPct}`}
                        suffix='%'
                        content={
                            <div className={styles.chartMedium}>
                                <ResponsiveContainer>
                                    <RadialBarChart
                                        innerRadius='80%'
                                        outerRadius='100%'
                                        data={gaugeData}
                                        startAngle={90}
                                        endAngle={90 - (progressPct / 100) * 360}>
                                        <RadialBar
                                            background
                                            dataKey='value'
                                            cornerRadius={6}
                                        />
                                        <Tooltip />
                                    </RadialBarChart>
                                </ResponsiveContainer>
                            </div>
                        }
                    />
                </div>
            </div>
            <div className='row'>
                <div className='col-12 g-3'>
                    <KPICard
                        title='Emissions Trend (12 months)'
                        value={`${progressPct}`}
                        suffix='%'
                        content={
                            <div className={styles.chartLarge}>
                                <ResponsiveContainer>
                                    <LineChart data={monthlyTrend}>
                                        <CartesianGrid strokeDasharray='3 3' />
                                        <XAxis dataKey='month' />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line
                                            type='monotone'
                                            dataKey='co2'
                                            name='kg CO₂e'
                                            stroke={COLORS.deepBlue}
                                            strokeWidth={3}
                                            dot={{ r: 3 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        }
                    />
                </div>
            </div>

            <div className='row'>
                <div className='col-12 col-lg-4 col-md-6 g-3'>
                    <KPICard
                        title='By Category'
                        content={
                            <div className={styles.chartLarge}>
                                <ResponsiveContainer>
                                    <PieChart>
                                        <Tooltip />
                                        <Pie
                                            data={categoryBreakdown}
                                            dataKey='value'
                                            nameKey='name'
                                            outerRadius={100}
                                            innerRadius={60}
                                            paddingAngle={2}>
                                            {categoryBreakdown.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={
                                                        [
                                                            COLORS.brightGreen,
                                                            COLORS.deepBlue,
                                                            COLORS.orange,
                                                            COLORS.lightSky,
                                                            "#9CA3AF",
                                                        ][index % 5]
                                                    }
                                                />
                                            ))}
                                        </Pie>
                                        <Legend
                                            verticalAlign='bottom'
                                            align='center'
                                            iconType='square'
                                            layout='horizontal'
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        }
                    />
                </div>
                <div className='col-12 col-lg-8 col-md-6 g-3'>
                    <KPICard
                        title='Scopes Overview'
                        content={
                            <div className={styles.chartLarge}>
                                <ResponsiveContainer>
                                    <BarChart data={scopeBars}>
                                        <CartesianGrid strokeDasharray='3 3' />
                                        <XAxis dataKey='scope' />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar
                                            dataKey='value'
                                            name='kg CO₂e'
                                            fill={COLORS.brightGreen}
                                            radius={[8, 8, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        }
                    />
                </div>
            </div>
            <div className='row'>
                <div className='col-12 col-md-8 g-3'>
                    <KPICard
                        title='Suggestions'
                        content={
                            <ul className={styles.suggestions + " d-flex flex-column align-items-start"}>
                                {[
                                    "Shift 30% of commute from car → public transport",
                                    "Lower office heating by 1°C for 3 months",
                                    "Switch 50% of cloud workloads to renewable-backed regions",
                                    "Cater two vegetarian lunches per week",
                                ].map((t, i) => (
                                    <li
                                        key={i}
                                        className={styles.suggestionItem}>
                                        {t}
                                    </li>
                                ))}
                            </ul>
                        }
                    />
                </div>
            </div>
        </main>
    )
}
