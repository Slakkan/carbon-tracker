'use client'

import useDemoFetch from '@/hooks/use-demo-fetch'
import styles from './demo-fetch-toggle.module.scss'

const DemoFetchToggle = () => {
  const { clientOnly, setClientOnly } = useDemoFetch()

  return (
    <button
      type="button"
      aria-label="Toggle client-only fetch"
      aria-pressed={clientOnly}
      title="Toggle client-only fetch to show Suspense skeletons"
      className={`${styles.fab} ${clientOnly ? styles.on : styles.off}`}
      onClick={() => setClientOnly(!clientOnly)}
    >
      {/* simple SVG bolt icon */}
      <svg className={styles.icon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M13 2L3 14h7l-1 8L21 10h-7l-1-8z" fill="currentColor" />
      </svg>
    </button>
  )
}

export default DemoFetchToggle
