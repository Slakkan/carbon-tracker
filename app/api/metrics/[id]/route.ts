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
export async function PUT(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params
  await seedIfEmpty()
  const patch = (await req.json()) as Partial<EmissionEntry>
  const metrics = await readEntries()
  const idx = metrics.findIndex((m) => m.id === id)
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  metrics[idx] = { ...metrics[idx], ...patch, id }
  await writeEntries(metrics)
  return NextResponse.json(metrics[idx])
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
