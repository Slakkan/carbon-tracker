import { NextResponse } from "next/server"
import { COLORS } from "@/lib/mock-data"
import { sleep } from "@/lib/utils"

export async function GET() {
    await sleep()
    return NextResponse.json(COLORS)
}
