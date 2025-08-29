import { NextResponse } from "next/server"
import { monthlyTrend } from "@/lib/mock-data"
import { sleep } from "@/lib/utils"

export async function GET() {
    await sleep(450)
    return NextResponse.json(monthlyTrend)
}
