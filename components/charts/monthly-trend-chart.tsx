import { FunctionComponent } from "react"

import KPICard from "../kpi-card"
import styles from "./charts.module.scss"
import { COLORS } from "@/lib/mock-data"
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts"
import { MonthlyTrend } from "@/models/api/monthly-trend.model"

interface MonthlyTrendChartProps {
    progressPct: number
    monthlyTrend: MonthlyTrend[]
}

const MonthlyTrendChart: FunctionComponent<MonthlyTrendChartProps> = ({ progressPct, monthlyTrend }) => {
    return (
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
    )
}

export default MonthlyTrendChart
