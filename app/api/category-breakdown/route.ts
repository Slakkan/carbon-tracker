import { NextResponse } from "next/server"
import { categoryBreakdown } from "@/lib/mock-data"
import { sleep } from "@/lib/utils"

export const revalidate = 0

export async function GET() {
    await sleep(600)
    return NextResponse.json(categoryBreakdown)
}
