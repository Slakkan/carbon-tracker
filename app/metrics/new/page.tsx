'use client'

import EntryForm from '@/components/entry-form'

export default function NewMetricPage() {
  return (
    <main className="container py-4">
      <h1 className="h4 mb-3">New Metric</h1>
      <EntryForm mode="create" />
    </main>
  )
}
