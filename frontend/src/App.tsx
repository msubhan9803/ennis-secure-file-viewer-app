import React from 'react'

export function App() {
	const [message, setMessage] = React.useState<string>('Loading...')
	const API_URL = (import.meta as any).env?.VITE_API_URL ?? 'http://localhost:3000'

	React.useEffect(() => {
		const controller = new AbortController()
		fetch(API_URL + '/health', { signal: controller.signal })
			.then(async (r) => {
				if (!r.ok) throw new Error('Failed to fetch')
				const data = await r.json()
				setMessage(`Backend status: ${data.status}`)
			})
			.catch(() => setMessage('Backend unreachable'))
		return () => controller.abort()
	}, [API_URL])

	return (
		<div style={{ fontFamily: 'sans-serif', padding: 24 }}>
			<h1>Secure File Viewer App</h1>
			<p>{message}</p>
		</div>
	)
}
