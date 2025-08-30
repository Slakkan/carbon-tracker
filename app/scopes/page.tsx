'use client'

import styles from '@/styles/scopes.module.scss'

export default function ScopesPage() {
  return (
    <main className="container py-4">
      <header className={styles.header}>
        <h1>GHG Emission Scopes</h1>
      </header>

      <section className={styles.lead}>
        The Greenhouse Gas (GHG) Protocol groups emissions into three “scopes” to make reporting
        clear and comparable. Here’s what each one means:
      </section>

      <div className={styles.grid}>
        <article className={`${styles.card} ${styles.scope1}`}>
          <h2>Scope 1 — Direct</h2>
          <p>
            Emissions from sources <strong>owned or controlled</strong> by your organization.
          </p>
          <ul>
            <li>Combustion in company vehicles</li>
            <li>On-site boilers, furnaces, generators</li>
            <li>Industrial processes you operate</li>
          </ul>
        </article>

        <article className={`${styles.card} ${styles.scope2}`}>
          <h2>Scope 2 — Purchased Energy</h2>
          <p>
            Indirect emissions from the <strong>generation of purchased</strong>
            electricity, steam, heating, or cooling you consume.
          </p>
          <ul>
            <li>Grid electricity for offices, data rooms, warehouses</li>
            <li>District heating or cooling</li>
          </ul>
        </article>

        <article className={`${styles.card} ${styles.scope3}`}>
          <h2>Scope 3 — Value Chain</h2>
          <p>
            All other indirect emissions in your <strong>upstream and downstream</strong>{' '}
            activities.
          </p>
          <ul>
            <li>Employee commuting & business travel</li>
            <li>Purchased goods & services, capital goods</li>
            <li>Waste & end-of-life treatment</li>
            <li>Upstream transport & distribution, downstream product use</li>
          </ul>
        </article>
      </div>

      <section className={styles.notes}>
        <h3>Tips</h3>
        <ul>
          <li>
            Scopes are about <strong>who controls the source</strong>, not who pays the bill.
          </li>
          <li>
            Scope 2 depends on your <strong>electricity mix</strong> (market/location-based).
          </li>
          <li>Scope 3 often dominates for service companies; start with the largest categories.</li>
        </ul>
      </section>
    </main>
  )
}
