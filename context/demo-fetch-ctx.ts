import { createContext } from 'react'

type Ctx = { clientOnly: boolean; setClientOnly: (v: boolean) => void }
const DemoCtx = createContext<Ctx | null>(null)

export default DemoCtx
