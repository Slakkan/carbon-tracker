// app/metrics/[id]/edit/page.tsx
import * as React from 'react'

import EntryForm from '@/components/entry-form'
import { readEntries } from '@/lib/db'

export default async function EditMetricPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const entries = await readEntries()
  const data = entries.find((e) => e.id === id)
  if (!data) return <main className="container py-4">Not found</main>

  return (
    <main className="container py-4">
      <h1 className="h4 mb-3">Edit Metric</h1>
      <EntryForm key={id} mode="edit" id={id} initial={data} />
    </main>
  )
}
