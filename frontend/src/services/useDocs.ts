import React from 'react'

const API_URL = (import.meta as any).env?.VITE_API_URL ?? 'http://localhost:3000'

export function useGenerateLink() {
  const [loading, setLoading] = React.useState(false)

  const generate = React.useCallback(async (): Promise<string | null> => {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/generate-link`, { method: 'POST' })
      if (!res.ok) return null
      const data = (await res.json()) as { link?: string }
      return data.link ?? null
    } catch {
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  return { generate, loading }
}

export function useViewDoc(token: string) {
  const [loading, setLoading] = React.useState(true)
  const [status, setStatus] = React.useState<'idle' | 'success' | 'error'>('idle')

  React.useEffect(() => {
    const controller = new AbortController()
    const run = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${API_URL}/api/docs/view/${token}`, { signal: controller.signal })
        setStatus(res.ok ? 'success' : 'error')
      } catch {
        setStatus('error')
      } finally {
        setLoading(false)
      }
    }
    run()
    return () => controller.abort()
  }, [token])

  return { status, loading }
}


