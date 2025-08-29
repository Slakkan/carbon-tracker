import { FunctionComponent } from "react"

import KPICard from "../kpi-card"
import styles from "./charts.module.scss"
import { ResponsiveContainer, RadialBarChart, RadialBar, Tooltip } from "recharts"
import { GaugeData } from "@/models/api/gauge.model"

interface GoalChartProps {
    progressPct: number
    gaugeData: GaugeData[]
}

const GoalChart: FunctionComponent<GoalChartProps> = ({ progressPct, gaugeData }) => {
    return (
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
    )
}

export default GoalChart
