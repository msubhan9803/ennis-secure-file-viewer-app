import React from 'react'

export function LoaderOverlay() {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-white/70">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-600 border-t-transparent" />
    </div>
  )
}


