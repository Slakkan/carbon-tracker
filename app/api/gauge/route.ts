import { NextResponse } from "next/server"
import { gaugeData } from "@/lib/mock-data"
import { sleep } from "@/lib/utils"
export const revalidate = 0

export async function GET() {
    await sleep(800)
    return NextResponse.json(gaugeData)
}
