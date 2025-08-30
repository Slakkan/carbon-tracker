'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { EmissionEntry } from '@/models/emissions'
import styles from './entry-form.module.scss'

type Props = {
  mode: 'create' | 'edit'
  initial?: Partial<EmissionEntry>
  id?: string
}

export default function EntryForm({ mode, initial = {}, id }: Props) {
  const router = useRouter()
  const [today, setToday] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    date: initial.date ?? today,
    category: (initial.category as any) ?? 'Energy',
    scope: (initial.scope as any) ?? 'Scope 2',
    amount: initial.amount ?? 0,
    note: initial.note ?? '',
  })

  useEffect(() => {
    setToday(new Date().toISOString().slice(0, 10))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const url = mode === 'create' ? '/api/metrics' : `/api/metrics/${id}`
      const method = mode === 'create' ? 'POST' : 'PUT'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, amount: Number(form.amount) }),
      })
      if (!res.ok) throw new Error(await res.text())

      router.push('/metrics')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.group}>
        <label className={styles.label} htmlFor="date">
          Date
        </label>
        <input
          id="date"
          type="date"
          className={styles.input}
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />
      </div>

      <div className={styles.group}>
        <label className={styles.label} htmlFor="category">
          Category
        </label>
        <select
          id="category"
          className={styles.select}
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          {['Energy', 'Transport', 'Food', 'Purchases', 'Waste'].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className={styles.group}>
        <label className={styles.label} htmlFor="scope">
          Scope
        </label>
        <select
          id="scope"
          className={styles.select}
          value={form.scope}
          onChange={(e) => setForm({ ...form, scope: e.target.value })}
        >
          {['Scope 1', 'Scope 2', 'Scope 3'].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className={styles.group}>
        <label className={styles.label} htmlFor="amount">
          Amount (kg CO₂e)
        </label>
        <input
          id="amount"
          type="number"
          min={0}
          className={styles.input}
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
          required
        />
      </div>

      <div className={`${styles.group} ${styles.full}`}>
        <label className={styles.label} htmlFor="note">
          Note
        </label>
        <input
          id="note"
          className={styles.input}
          placeholder="Optional"
          value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
        />
      </div>

      <div className={styles.actions}>
        <button type="submit" className={styles.btnPrimary} disabled={loading}>
          {loading
            ? mode === 'create'
              ? 'Creating...'
              : 'Saving...'
            : mode === 'create'
              ? 'Create'
              : 'Save'}
        </button>
        <button type="button" className={styles.btnSecondary} onClick={() => router.back()}>
          Cancel
        </button>
      </div>
    </form>
  )
}
