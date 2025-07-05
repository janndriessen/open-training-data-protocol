import { NextResponse } from 'next/server'
import { Tusky } from '@tusky-io/ts-sdk'

import { getSigner } from '@/app/api/blob/signer'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const uploadId = searchParams.get('uploadId')

  if (!uploadId) {
    return NextResponse.json({ error: 'Invalid uploadId' }, { status: 400 })
  }

  if (typeof uploadId !== 'string') {
    return NextResponse.json({ error: 'Invalid uploadId' }, { status: 400 })
  }

  try {
    const keypair = getSigner()

    const tusky = new Tusky({ wallet: { keypair } })
    await tusky.auth.signIn()

    const fileMetadata = await tusky.file.get(uploadId)

    console.log(fileMetadata, uploadId)

    return NextResponse.json(
      {
        hash: uploadId,
        blobId: fileMetadata.blobId,
        status: fileMetadata.status,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to upload blob' },
      { status: 500 }
    )
  }
}
