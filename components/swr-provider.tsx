"use client"

import { fetcher } from "@/lib/fetcher"
import { SWRConfig } from "swr"

export default function SWRProvider({
    children,
    fallback,
}: {
    children: React.ReactNode
    fallback: Record<string, unknown>
}) {
    return (
        <SWRConfig
            value={{
                fallback,
                suspense: true,
                revalidateOnMount: true,
                fetcher,
            }}>
            {children}
        </SWRConfig>
    )
}
