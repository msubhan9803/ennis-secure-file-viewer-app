import React from 'react'
import { useNavigate } from 'react-router-dom'
import { GenerateRow } from '../ui/GenerateRow'
import { LoaderOverlay } from '../ui/LoaderOverlay'
import { useGenerateLink } from '../services/useDocs'

const DOCUMENTS = [
  '2024-Q3-Statement.pdf',
  '2023-Tax-Form-1099.pdf',
]

export function Home() {
  const navigate = useNavigate()
  const { generate, loading } = useGenerateLink()

  return (
    <div className="space-y-6">
      <header className="space-y-1 text-center">
        <h1 className="text-2xl font-semibold">Documents</h1>
        <p className="text-sm text-gray-600">Generate a secure one-time viewing link</p>
      </header>

      <div className="rounded-lg border border-gray-200 divide-y">
        {DOCUMENTS.map((name) => (
          <GenerateRow
            key={name}
            name={name}
            onGenerate={async () => {
              const link = await generate()
              if (link) {
                const token = link.split('/').pop() || ''
                navigate(`/docs/view/${token}`, { state: { documentName: name } })
              }
            }}
          />
        ))}
      </div>

      {loading && <LoaderOverlay />}
    </div>
  )
}


