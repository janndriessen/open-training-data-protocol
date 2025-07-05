import { useMutation } from '@tanstack/react-query'
import { encodeFunctionData } from 'viem'

import { OPEN_TRAINING_DATA_PROTOCOL_CONTRACT } from '@/app/config'
import { ABI } from '@/lib/abi'

import { usePrivy, useWallets } from '@privy-io/react-auth'

import type { Hex } from 'viem'

export function useStoreActivity() {
  const { authenticated } = usePrivy()
  const { wallets } = useWallets()

  const store = useMutation({
    mutationFn: async ({
      activityType,
      fileId,
      timestamp,
      duration,
    }: {
      activityType: number
      fileId: Hex
      timestamp: number
      duration: number
    }) => {
      if (!authenticated) throw new Error('Not authenticated')

      const wallet = wallets[0]
      console.log('storing activity for wallet', wallet)
      if (!wallet?.address) throw new Error('No wallet found')

      const data = encodeFunctionData({
        abi: ABI,
        functionName: 'storeActivity',
        args: [activityType, fileId, timestamp, duration],
      })

      const provider = await wallet.getEthereumProvider()

      const txHash = await provider.request({
        method: 'eth_sendTransaction',
        params: [
          {
            to: OPEN_TRAINING_DATA_PROTOCOL_CONTRACT,
            data,
          },
        ],
      })

      return txHash
    },
  })

  return { store: store.mutateAsync }
}
