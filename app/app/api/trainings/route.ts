import { NextResponse } from 'next/server'
import { createPublicClient, http, isAddress } from 'viem'
import { zircuitGarfieldTestnet } from 'viem/chains'

import { OPEN_TRAINING_DATA_PROTOCOL_CONTRACT } from '@/app/config'
import { ABI } from '@/lib/abi'

const publicClient = createPublicClient({
  chain: zircuitGarfieldTestnet,
  transport: http('https://garfield-testnet.zircuit.com/'),
})

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const address = searchParams.get('address')

  if (!address || !isAddress(address)) {
    return NextResponse.json({ error: 'Address is required' }, { status: 400 })
  }

  try {
    const data = await publicClient.readContract({
      address: OPEN_TRAINING_DATA_PROTOCOL_CONTRACT,
      abi: ABI,
      functionName: 'getUserActivities',
      args: [address],
    })

    return NextResponse.json({
      address,
      activities: data,
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    )
  }
}
