'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'

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
      // Expecting { hash: string }
      return data.hash as string
    },
  })

  // Mutation for calling the contract (using the hash)
  const contractMutation = useMutation({
    mutationFn: async (hash: string) => {
      // TODO: Replace with actual contract call logic
      // For now, simulate with a fetch or a delay
      // Example: POST /api/contract with { hash, type }
      //   const res = await fetch('/api/contract', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({ hash, type }),
      //   })
      //   if (!res.ok) throw new Error('Failed to call contract')
      //   const data = await res.json()
      //   // Expecting { txHash: string }
      //   return data.txHash as string
      return '0x1234567890'
    },
    onSuccess: (txHash) => setTxHash(txHash),
  })

  const storeActivity = async (file: File | null) => {
    setTxHash(null)
    try {
      const hash = await uploadMutation.mutateAsync(file)
      await contractMutation.mutateAsync(hash)
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
