import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useViewDoc } from '../services/useDocs'
import { LoaderOverlay } from '../ui/LoaderOverlay'
import { CheckCircle2, FileText, TriangleAlert } from 'lucide-react'

export function ViewDoc() {
  const { token = '' } = useParams()
  const location = useLocation() as { state?: { documentName?: string } }
  const { status, loading } = useViewDoc(token)

  const docName = location.state?.documentName ?? 'Selected Document'

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


