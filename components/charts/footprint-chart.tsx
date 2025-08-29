import { FunctionComponent } from "react"

import KPICard from "../kpi-card"
import styles from "./charts.module.scss"

interface FootprintChartProps {
    currentFootprint: number
    delta: number
}

const FootprintChart: FunctionComponent<FootprintChartProps> = ({ currentFootprint, delta }) => {
    return (
        <KPICard
            className={styles.chartSmall}
            title='Total CO₂e (this month)'
            value={currentFootprint.toLocaleString()}
            suffix='kg'
            content={
                <div className={styles.delta + " mt-2"}>
                    {delta <= 0 ? `▼ ${Math.abs(delta)} kg vs last month` : `▲ ${delta} kg vs last month`}
                </div>
            }
        />
    )
}

export default FootprintChart
