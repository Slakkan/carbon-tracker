import { NextResponse } from "next/server"
import { currentFootprint, lastMonth, delta, goal, progressPct, offset } from "@/lib/mock-data"
import { sleep } from "@/lib/utils"
export const revalidate = 0

export async function GET() {
    await sleep(350)
    return NextResponse.json({ currentFootprint, lastMonth, delta, goal, progressPct, offset })
}
