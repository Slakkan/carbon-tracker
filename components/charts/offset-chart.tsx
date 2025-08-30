import { FunctionComponent } from 'react'

import KPICard from '../kpi-card'
import styles from './charts.module.scss'
import { formatNumber } from '@/lib/utils'

interface OffsetChartProps {
  offset: number
}

const OffsetChart: FunctionComponent<OffsetChartProps> = ({ offset }) => {
  return (
    <KPICard
      className={styles.chartSmall}
      title="Offsets Applied"
      value={formatNumber(offset)}
      suffix="kg"
      content={
        <>
          <div className="badge badge--accent me-2 mt-2">Project: Forest</div>
          <div className="badge badge--accent me-2 mt-2">Project: Renewables</div>
        </>
      }
    />
  )
}

export default OffsetChart
