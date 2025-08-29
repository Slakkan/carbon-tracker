import { NextResponse } from "next/server"
import { scopeBars } from "@/lib/mock-data"
import { sleep } from "@/lib/utils"
export const revalidate = 0

export async function GET() {
    await sleep()
    return NextResponse.json(scopeBars)
}
