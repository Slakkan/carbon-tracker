import { NextResponse } from 'next/server'
import { readEntries, writeEntries } from '@/lib/db'
import { seedIfEmpty } from '@/lib/seed'
import type { EmissionEntry } from '@/models/emissions'

export const revalidate = 0

// GET /api/metrics/[id]
export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params
  await seedIfEmpty()
  const metrics = await readEntries()
  const metric = metrics.find((m) => m.id === id)
  return metric
    ? NextResponse.json(metric)
    : NextResponse.json({ error: 'Not found' }, { status: 404 })
}

// PUT /api/metrics/[id]
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params
  const body: Partial<EmissionEntry> = await req.json()
  const entries = await readEntries()
  const idx = entries.findIndex((e) => e.id === id)
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  entries[idx] = { ...entries[idx], ...body, id }
  await writeEntries(entries)

  return NextResponse.json(entries[idx])
}

// DELETE /api/metrics/[id]
export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params
  await seedIfEmpty()
  const metrics = await readEntries()
  const next = metrics.filter((m) => m.id !== id)
  if (next.length === metrics.length) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  await writeEntries(next)
  return NextResponse.json({ ok: true })
}
