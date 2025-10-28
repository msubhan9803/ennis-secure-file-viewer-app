import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useViewDoc } from '../services/useDocs'
import { LoaderOverlay } from '../ui/LoaderOverlay'
import { CheckCircle2, FileText, TriangleAlert, Clipboard, ClipboardCheck } from 'lucide-react'
import { useState } from 'react'

export function ViewDoc() {
  const { token = '' } = useParams()
  const location = useLocation() as { state?: { documentName?: string } }
  const { status, loading } = useViewDoc(token)
  const [copied, setCopied] = useState(false)

  const docName = location.state?.documentName ?? 'Selected Document'
  const fullLink = `${window.location.origin}/docs/view/${token}`

  const handleCopy = () => {
    navigator.clipboard.writeText(fullLink)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      })
  }

  return (
    <div className="flex flex-col items-center justify-center text-center py-16">
      <div className="w-full max-w-xl">
        {loading && <LoaderOverlay />}

        {status === 'success' && !loading && (
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-2 text-green-700">
              <CheckCircle2 className="h-6 w-6" />
              <h2 className="text-xl font-semibold">You are now securely viewing:</h2>
            </div>
            <div className="rounded-lg border border-green-200 p-6 bg-green-50">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-green-700" />
                <div className="text-left">
                  <p className="font-medium">{docName}</p>
                  <p className="text-sm text-gray-600">Dummy preview below</p>
                </div>
              </div>
              <div className="mt-6 h-64 rounded-md border border-dashed grid place-items-center text-gray-500 bg-white">
                <span>PDF preview placeholder</span>
              </div>
              {/* Copy-to-clipboard button */}
              <div className="flex flex-col items-center gap-2 mt-6">
                <button
                  className="flex items-center gap-2 border rounded px-4 py-2 text-green-800 border-green-300 bg-green-50 hover:bg-green-100 active:bg-green-200 transition focus:outline-none"
                  onClick={handleCopy}
                >
                  {copied ? <ClipboardCheck className="h-5 w-5" /> : <Clipboard className="h-5 w-5" />}
                  <span>{copied ? 'Copied!' : 'Copy link to clipboard'}</span>
                </button>
                <div className="text-xs text-gray-600 select-all break-all max-w-full">{fullLink}</div>
              </div>
            </div>
          </div>
        )}

        {status === 'error' && !loading && (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-red-700">
              <TriangleAlert className="h-6 w-6" />
              <h2 className="text-xl font-semibold">Invalid or expired link.</h2>
            </div>
            <p className="text-sm text-gray-600">Please request a new secure link and try again.</p>
          </div>
        )}
      </div>
    </div>
  )
}


