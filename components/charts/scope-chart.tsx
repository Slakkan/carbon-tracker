import { FunctionComponent } from "react"

import KPICard from "../kpi-card"
import styles from "./charts.module.scss"
import { COLORS } from "@/lib/mock-data"
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts"

type Scope = { scope: string; value: number }

interface ScopeChartProps {
    scope: Scope[]
}

const ScopeChart: FunctionComponent<ScopeChartProps> = ({ scope }) => {
    return (
        <KPICard
            title='Scopes Overview'
            content={
                <div className={styles.chartLarge}>
                    <ResponsiveContainer>
                        <BarChart data={scope}>
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
    )
}

export default ScopeChart
