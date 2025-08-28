import { FunctionComponent, ReactNode } from "react"

import styles from "./kpi-card.module.scss"

interface KPICard {
    title: string
    value?: string
    className?: string
    suffix?: string
    content?: ReactNode
}

const KPICard: FunctionComponent<KPICard> = ({ title, value, className, suffix, content }) => {
    return (
        <div className={styles.card + " " + className}>
            <h3 className={styles.cardTitle}>{title}</h3>
            <div className={styles.bigNumber + " my-2"}>
                {value}
                {suffix ? <span className={styles.suffix}>{suffix}</span> : null}
            </div>
            {content}
        </div>
    )
}

export default KPICard
