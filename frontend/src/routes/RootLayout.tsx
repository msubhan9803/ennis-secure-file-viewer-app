import React from 'react'
import { Outlet, Link, NavLink } from 'react-router-dom'
import { cn } from '../lib/utils'

export function RootLayout() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <nav className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur">
        <div className="container-app h-14 flex items-center justify-between">
          <Link to="/" className="font-semibold text-lg">Ennis-Puentes</Link>
          <div className="flex items-center gap-4 text-sm">
            <NavLink
              to="/"
              className={({ isActive }) => cn('hover:text-green-700', isActive && 'text-green-700 font-medium')}
            >Home</NavLink>
          </div>
        </div>
      </nav>

      <main className="container-app py-10">
        <Outlet />
      </main>
    </div>
  )
}


