// components/entries/EntryForm.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { EmissionEntry } from '@/models/emissions'
import styles from './entry-form.module.scss' // if you use the module; or remove if not

type Props = {
  mode: 'create' | 'edit'
  initial?: Partial<EmissionEntry>
  id?: string
}

export default function EntryForm({ mode, initial = {}, id }: Props) {
  const router = useRouter()

  // If the initial amount is negative, it's an offset. Show abs(amount) in the input.
  const [isOffset, setIsOffset] = useState(Boolean(initial.amount && initial.amount < 0))
  const [form, setForm] = useState({
    date: initial.date ?? '',
    category: (initial.category as any) ?? 'Energy',
    scope: (initial.scope as any) ?? 'Scope 2',
    amount: Math.abs(initial.amount ?? 0),
    note: initial.note ?? '',
  })

  // Re-sync when editing different records or after fresh server fetch
  useEffect(() => {
    setIsOffset(Boolean(initial.amount && initial.amount < 0))
    setForm({
      date: initial.date ?? '',
      category: (initial.category as any) ?? 'Energy',
      scope: (initial.scope as any) ?? 'Scope 2',
      amount: Math.abs(initial.amount ?? 0),
      note: initial.note ?? '',
    })
  }, [id, initial?.date, initial?.category, initial?.scope, initial?.amount, initial?.note])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const url = mode === 'create' ? '/api/metrics' : `/api/metrics/${id}`
    const method = mode === 'create' ? 'POST' : 'PUT'

    // Always send a signed amount based on the toggle
    const signedAmount = isOffset ? -Math.abs(Number(form.amount)) : Math.abs(Number(form.amount))

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, amount: signedAmount }),
    })
    if (!res.ok) throw new Error(await res.text())
    router.push('/metrics')
  }

  return (
    <form className={styles?.form ?? 'row g-3'} onSubmit={handleSubmit}>
      <div className={styles?.group ?? 'col-md-3'}>
        <label className={styles?.label ?? 'form-label'}>Date</label>
        <input
          type="date"
          className={styles?.input ?? 'form-control'}
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />
      </div>

      <div className={styles?.group ?? 'col-md-3'}>
        <label className={styles?.label ?? 'form-label'}>Category</label>
        <select
          className={styles?.select ?? 'form-select'}
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          {['Energy', 'Transport', 'Food', 'Purchases', 'Waste'].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className={styles?.group ?? 'col-md-3'}>
        <label className={styles?.label ?? 'form-label'}>Scope</label>
        <select
          className={styles?.select ?? 'form-select'}
          value={form.scope}
          onChange={(e) => setForm({ ...form, scope: e.target.value })}
        >
          {['Scope 1', 'Scope 2', 'Scope 3'].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className={styles?.group ?? 'col-md-3'}>
        <label className={styles?.label ?? 'form-label'}>Amount (kg CO₂e)</label>
        <input
          type="number"
          min={0} // keep input positive; sign handled by the toggle
          className={styles?.input ?? 'form-control'}
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
          required
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.35rem' }}>
          <input
            id="offsetToggle"
            type="checkbox"
            checked={isOffset}
            onChange={(e) => setIsOffset(e.target.checked)}
          />
          <label htmlFor="offsetToggle" style={{ margin: 0 }}>
            Apply as <strong>offset</strong>
          </label>
        </div>
      </div>

      <div className={`${styles?.group ?? ''} ${styles?.full ?? 'col-12'}`}>
        <label className={styles?.label ?? 'form-label'}>Note</label>
        <input
          className={styles?.input ?? 'form-control'}
          placeholder="Optional"
          value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
        />
      </div>

      <div className={styles?.actions ?? 'col-12 d-flex gap-2'}>
        <button type="submit" className={styles?.btnPrimary ?? 'btn btn-primary'}>
          {mode === 'create' ? 'Create' : 'Save'}
        </button>
        <button
          type="button"
          className={styles?.btnSecondary ?? 'btn btn-outline-secondary'}
          onClick={() => history.back()}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
