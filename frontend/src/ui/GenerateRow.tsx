import React from 'react'

interface Props {
  name: string
  onGenerate: () => Promise<void>
}

export function GenerateRow({ name, onGenerate }: Props) {
  const [pending, setPending] = React.useState(false)

  const handleClick = async () => {
    if (pending) return
    setPending(true)
    try {
      await onGenerate()
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="flex items-center justify-between p-4">
      <span className="text-sm font-medium">{name}</span>
      <button
        onClick={handleClick}
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white shadow hover:bg-green-700 disabled:opacity-50"
      >
        {pending && <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />}
        Generate Secure Link
      </button>
    </div>
  )
}


