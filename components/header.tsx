'use client'

import Link from 'next/link'
import styles from './header.module.scss'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <header className={styles.header}>
      <div className="container pt-5 pb-3 d-flex align-items-end justify-content-between">
        <Link href="/" className={isActive('/') ? 'active' : ''}>
          <h1 className="m-0">Carbon Tracker</h1>
        </Link>
        <Link href="/metrics" className={isActive('/metrics') ? 'active' : ''}>
          <h2 className="m-0">Metrics</h2>
        </Link>
        <Link href="/scopes" className={isActive('/scopes') ? 'active' : ''}>
          <h2 className="m-0">Scopes</h2>
        </Link>
        <span className="badge">Demo data</span>
      </div>
    </header>
  )
}
