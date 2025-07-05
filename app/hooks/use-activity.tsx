'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'

import { stringToBytes32 } from '@/lib/utils'

import { useStoreActivity } from './use-store'

interface ActivityContextValue {
  // Query result
  data: any
  isLoading: boolean
  isError: boolean
  error: any
  // Upload/contract state
  storeActivity: (file: File | null) => Promise<void>
  uploading: boolean
  uploadComplete: boolean
  uploadError: any
  contractPending: boolean
  contractComplete: boolean
  contractError: any
  txHash: string | null
}

const ActivityContext = createContext<ActivityContextValue | undefined>(
  undefined
)

export function ActivityProvider({
  type,
  children,
}: {
  type: 'run' | 'bike'
  children: ReactNode
}) {
  // Query for fetching activities
  const query = useQuery({
    queryKey: ['activity', type],
    queryFn: async () => {
      const res = await fetch(`/api/list?type=${type}`)
      if (!res.ok) throw new Error('Failed to fetch activity')
      return res.json()
    },
  })

  // State for transaction hash
  const [txHash, setTxHash] = useState<string | null>(null)
  const { store } = useStoreActivity()

  // Mutation for uploading the file (POST /api/blob)
  const uploadMutation = useMutation({
    mutationFn: async (file: File | null) => {
      //   const formData = new FormData()
      //   formData.append('file', file)
      const res = await fetch('/api/blob', {
        method: 'POST',
      })
      if (!res.ok) throw new Error('Failed to upload file')
      const data = await res.json()

      let blobId = data.blobId
      const uploadId = data.uploadId
      console.log(uploadId, blobId, 'Initial')

      // Poll for blobId if not present
      if ((!blobId || blobId === 'unknown') && uploadId) {
        for (let i = 0; i < 10; i++) {
          // up to 100s
          await new Promise((resolve) => setTimeout(resolve, 10000))
          const statusRes = await fetch(`/api/blob/status?uploadId=${uploadId}`)
          if (!statusRes.ok) continue
          const statusData = await statusRes.json()
          console.log(i, statusData.blobId)
          if (statusData.blobId && statusData.blobId !== 'unknown') {
            blobId = statusData.blobId
            break
          }
        }
        if (!blobId) throw new Error('Timed out waiting for blobId')
      }

      // FIXME: change to blobId
      return { blobId: '0000' }
    },
  })

  // Mutation for calling the contract (using the hash)
  const contractMutation = useMutation({
    mutationFn: async (blobId: string) => {
      const txHash = await store({
        activityType: 0,
        fileId: stringToBytes32(blobId),
        timestamp: 1751736689,
        duration: 100,
      })
      return txHash
    },
    onSuccess: (txHash) => setTxHash(txHash),
  })

  const storeActivity = async (file: File | null) => {
    setTxHash(null)
    try {
      const { blobId } = await uploadMutation.mutateAsync(file)
      await contractMutation.mutateAsync(blobId)
    } catch (e) {
      // Errors are handled by TanStack Query
    }
  }

  const value: ActivityContextValue = {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    storeActivity,
    uploading: uploadMutation.isPending,
    uploadComplete: uploadMutation.isSuccess,
    uploadError: uploadMutation.isError ? uploadMutation.error : null,
    contractPending: contractMutation.isPending,
    contractComplete: contractMutation.isSuccess,
    contractError: contractMutation.isError ? contractMutation.error : null,
    txHash,
  }

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  )
}

export function useActivity() {
  const ctx = useContext(ActivityContext)
  if (!ctx)
    throw new Error('useActivity must be used within an ActivityProvider')
  return ctx
}
