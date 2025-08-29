import DemoCtx from '@/context/demo-fetch-ctx'
import { useContext } from 'react'

const useDemoFetch = () => {
  const ctx = useContext(DemoCtx)
  if (!ctx) throw new Error('useDemoFetch must be used within <DemoFetchWrapper>')
  return ctx
}

export default useDemoFetch
