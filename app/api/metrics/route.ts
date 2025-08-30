// app/api/metrics/route.ts
import { NextResponse } from 'next/server'
import { readEntries, writeEntries } from '@/lib/db'
import type { EmissionEntry } from '@/models/emissions'

export async function GET() {
  const entries = await readEntries()

  // ✅ sort by date desc
  const sorted = [...entries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

  return NextResponse.json(sorted)
}

export async function POST(req: Request) {
  const body: EmissionEntry = await req.json()
  const entries = await readEntries()
  const updated = [...entries, body]
  await writeEntries(updated)
  return NextResponse.json(body, { status: 201 })
}
