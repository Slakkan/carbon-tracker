import { FunctionComponent } from "react"

import KPICard from "../kpi-card"
import styles from "./charts.module.scss"
import { COLORS } from "@/lib/mock-data"
import { ResponsiveContainer, PieChart, Tooltip, Pie, Cell, Legend } from "recharts"
import { CategoryBreakdown } from "@/models/api/category-breakdown"

interface CategoryBreakdownChartProps {
    categoryBreakdown: CategoryBreakdown[]
}

const CategoryBreakdownChart: FunctionComponent<CategoryBreakdownChartProps> = ({ categoryBreakdown }) => {
    return (
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
                                {categoryBreakdown.map((_entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={
                                            [
                                                COLORS.brightGreen,
                                                COLORS.deepBlue,
                                                COLORS.orange,
                                                COLORS.lightSky,
                                                COLORS.lightGrey,
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
    )
}

export default CategoryBreakdownChart
