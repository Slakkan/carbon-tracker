"use client"

import styles from "./dashboard-loading.module.scss"

export default function DashboardLoading() {
    return (
        <main className={`container ${styles.wrapper}`}>
            <div className={styles.spinner} />
        </main>
    )
}
