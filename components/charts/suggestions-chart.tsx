import KPICard from "../kpi-card"
import styles from "./charts.module.scss"

const SuggestionsChart = () => {
    return (
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
    )
}

export default SuggestionsChart
