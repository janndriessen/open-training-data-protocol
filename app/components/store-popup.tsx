import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Loader2, Check } from 'lucide-react'
import { useActivity } from '../hooks/use-activity'

interface StoringTrainingPopupProps {
  isOpen?: boolean
  onClose?: () => void
  type: 'run' | 'bike'
}

export function StoringTrainingPopup({
  isOpen = true,
  onClose,
  type,
}: StoringTrainingPopupProps) {
  const {
    uploading,
    uploadComplete,
    uploadError,
    contractPending,
    contractComplete,
    contractError,
    txHash,
  } = useActivity()

  const handleClose = () => {
    if (onClose) {
      onClose()
    }
  }

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            Storing Training
          </AlertDialogTitle>
        </AlertDialogHeader>

        <div className="space-y-4 py-4">
          {/* Blob Upload Status */}
          <div className="flex items-center space-x-3">
            {uploadComplete ? (
              <Check className="h-5 w-5 text-green-500" />
            ) : uploading ? (
              <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
            ) : uploadError ? (
              <span className="h-5 w-5 text-red-500">!</span>
            ) : (
              <Loader2 className="h-5 w-5 text-gray-400" />
            )}
            <span
              className={`text-sm ${
                uploadComplete
                  ? 'text-green-600'
                  : uploadError
                  ? 'text-red-600'
                  : 'text-gray-600'
              }`}
            >
              {uploadComplete
                ? 'Blob uploaded to Walrus'
                : uploadError
                ? `Upload failed: ${uploadError.message}`
                : uploading
                ? 'Uploading blob to Walrus...'
                : 'Waiting to upload blob...'}
            </span>
          </div>

          {/* Metadata Storage Status */}
          <div className="flex items-center space-x-3">
            {contractComplete ? (
              <Check className="h-5 w-5 text-green-500" />
            ) : contractPending ? (
              <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
            ) : contractError ? (
              <span className="h-5 w-5 text-red-500">!</span>
            ) : (
              <Loader2 className="h-5 w-5 text-gray-400" />
            )}
            <span
              className={`text-sm ${
                contractComplete
                  ? 'text-green-600'
                  : contractError
                  ? 'text-red-600'
                  : 'text-gray-600'
              }`}
            >
              {contractComplete
                ? 'Metadata stored on Zircuit'
                : contractError
                ? `Contract failed: ${contractError.message}`
                : contractPending
                ? 'Storing metadata on Zircuit...'
                : 'Waiting to store metadata...'}
            </span>
          </div>

          {/* Transaction Hash - Only show when both complete and txHash exists */}
          {uploadComplete && contractComplete && txHash && (
            <div className="pt-4 border-t">
              <div className="text-sm text-gray-600 mb-2">
                Transaction Hash:
              </div>
              <a
                href={`https://explorer.garfield-testnet.zircuit.com/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline text-sm font-mono"
              >
                {txHash.slice(0, 6)}...{txHash.slice(-4)}
              </a>
            </div>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogAction
            onClick={handleClose}
            disabled={!uploadComplete || !contractComplete}
            className={`w-full ${
              uploadComplete && contractComplete
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Done
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
