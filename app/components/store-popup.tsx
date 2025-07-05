import React, { useState, useEffect } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Loader2, Check } from 'lucide-react'

interface StoringTrainingPopupProps {
  isOpen?: boolean
  onClose?: () => void
}

export function StoringTrainingPopup({
  isOpen = true,
  onClose,
}: StoringTrainingPopupProps) {
  const [blobUploadComplete, setBlobUploadComplete] = useState(false)
  const [metadataStoreComplete, setMetadataStoreComplete] = useState(false)
  const [txHash] = useState('0x7a8b9c...4f5e6d')

  // Simulate the upload processes
  useEffect(() => {
    if (isOpen) {
      // Simulate blob upload (3 seconds)
      const blobTimer = setTimeout(() => {
        setBlobUploadComplete(true)
      }, 3000)

      // Simulate metadata storage (5 seconds)
      const metadataTimer = setTimeout(() => {
        setMetadataStoreComplete(true)
      }, 5000)

      return () => {
        clearTimeout(blobTimer)
        clearTimeout(metadataTimer)
      }
    }
  }, [isOpen])

  const bothComplete = blobUploadComplete && metadataStoreComplete

  const handleClose = () => {
    if (onClose) {
      onClose()
    }
    // Reset states for next time
    setBlobUploadComplete(false)
    setMetadataStoreComplete(false)
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
            {blobUploadComplete ? (
              <Check className="h-5 w-5 text-green-500" />
            ) : (
              <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
            )}
            <span
              className={`text-sm ${
                blobUploadComplete ? 'text-green-600' : 'text-gray-600'
              }`}
            >
              {blobUploadComplete
                ? 'Blob uploaded to Walrus'
                : 'Uploading blob to Walrus...'}
            </span>
          </div>

          {/* Metadata Storage Status */}
          <div className="flex items-center space-x-3">
            {metadataStoreComplete ? (
              <Check className="h-5 w-5 text-green-500" />
            ) : (
              <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
            )}
            <span
              className={`text-sm ${
                metadataStoreComplete ? 'text-green-600' : 'text-gray-600'
              }`}
            >
              {metadataStoreComplete
                ? 'Metadata stored on Zircuit'
                : 'Storing metadata on Zircuit...'}
            </span>
          </div>

          {/* Transaction Hash - Only show when both complete */}
          {bothComplete && (
            <div className="pt-4 border-t">
              <div className="text-sm text-gray-600 mb-2">
                Transaction Hash:
              </div>
              <a
                href={`https://explorer.zircuit.com/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline text-sm font-mono"
              >
                {txHash}
              </a>
            </div>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogAction
            onClick={handleClose}
            disabled={!bothComplete}
            className={`w-full ${
              bothComplete
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
