// app/metrics/page.tsx
'use client'

import Link from 'next/link'

import styles from '@/styles/metrics-table.module.scss'
import useSWR, { mutate as globalMutate } from 'swr'

type Metric = {
  id: string
  date: string
  category: string
  scope: string
  amount: number
  note?: string
}

const fetcher = (url: string) =>
  fetch(url, { cache: 'no-store' }).then((r) => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`)
    return r.json()
  })

const fmt = (n: number) => new Intl.NumberFormat().format(n)

export default function MetricsPage() {
  const { data, isLoading, mutate } = useSWR<Metric[]>('/api/metrics', fetcher)
  const rows: Metric[] = Array.isArray(data) ? data : []

  async function onDelete(id: string) {
    mutate((list: any[] = []) => list.filter((m) => m.id !== id), false)
    await fetch(`/api/metrics/${id}`, { method: 'DELETE' })
    mutate() // list
    globalMutate('/api/metrics/summary')
  }

  return (
    <main className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1 className="h4 m-0">Metrics</h1>
        <Link href="/metrics/new" className="btn btn-success">
          + New Metric
        </Link>
      </div>

      <div className={styles.card}>
        <div className={styles.wrap}>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th className={styles.th}>Date</th>
                <th className={styles.th}>Category</th>
                <th className={styles.th}>Scope</th>
                <th className={styles.th}>Amount (kg)</th>
                <th className={styles.th}>Note</th>
                <th className={styles.th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {isLoading && (
                <tr>
                  <td className={styles.td} colSpan={6}>
                    Loading…
                  </td>
                </tr>
              )}

              {rows.map((m) => (
                <tr key={m.id} className={styles.tr}>
                  <td className={styles.td}>{m.date}</td>
                  <td className={styles.td}>{m.category}</td>
                  <td className={styles.td}>{m.scope}</td>
                  <td className={`${styles.td} ${styles.num}`}>{fmt(m.amount)}</td>
                  <td
                    className={styles.td}
                    style={{
                      maxWidth: 420,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                    title={m.note}
                  >
                    {m.note}
                  </td>
                  <td className={styles.td}>
                    <div className={styles.actions}>
                      <Link
                        href={`/metrics/${m.id}`}
                        className={styles.btnIcon}
                        title="Edit"
                        aria-label={`Edit ${m.id}`}
                      >
                        {/* pencil */}
                        <svg
                          className={styles.icon}
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41L18.37 3.3a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.84z"
                            fill="currentColor"
                          />
                        </svg>
                      </Link>
                      <button
                        onClick={() => onDelete(m.id)}
                        className={styles.btnIcon}
                        title="Delete"
                        aria-label={`Delete ${m.id}`}
                      >
                        {/* trash */}
                        <svg
                          className={styles.icon}
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M3 6h18M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V6h12Z"
                            stroke="red"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10 11v6M14 11v6"
                            stroke="red"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {!isLoading && rows.length === 0 && (
                <tr>
                  <td className={styles.td} colSpan={6}>
                    <div className={styles.empty}>
                      No metrics yet — click <strong>“+ New Metric”</strong> to add your first
                      entry.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
