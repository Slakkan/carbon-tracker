'use client'

import DemoCtx from '@/context/demo-fetch-ctx'
import { useEffect, useMemo, useState } from 'react'
import { SWRConfig } from 'swr'

export default function DemoFetchWrapper({ children }: { children: React.ReactNode }) {
  const [clientOnly, setClientOnly] = useState(false)

  // persist user choice between reloads
  useEffect(() => {
    const saved = localStorage.getItem('demo-client-fetch')
    if (saved) setClientOnly(saved === '1')
  }, [])
  useEffect(() => {
    localStorage.setItem('demo-client-fetch', clientOnly ? '1' : '0')
  }, [clientOnly])

  // When clientOnly = true, we override SWR to have NO fallback and no deduping
  const swrValue = useMemo(
    () =>
      clientOnly
        ? {
            // no fallback here on purpose, we want Suspense to show
            revalidateOnMount: true,
            dedupingInterval: 0,
            suspense: true,
            fetcher: (url: string) => fetch(url, { cache: 'no-store' }).then((r) => r.json()),
          }
        : undefined,
    [clientOnly],
  )
  return (
    <DemoCtx.Provider value={{ clientOnly, setClientOnly }}>
      {/* Only wrap with SWRConfig when overriding; otherwise inherit the server-provided one */}
      {clientOnly ? <SWRConfig value={swrValue as any}>{children}</SWRConfig> : children}
    </DemoCtx.Provider>
  )
}
