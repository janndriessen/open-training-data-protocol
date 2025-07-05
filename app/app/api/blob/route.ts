import { NextResponse } from 'next/server'
import { Tusky } from '@tusky-io/ts-sdk'
import path from 'path'
import { promises as fs } from 'fs'

import { getSigner } from '@/app/api/blob/signer'

const vaultId = '99e4890c-da5a-4c3c-b60b-323d372920ae'

export async function POST() {
  try {
    const keypair = getSigner()

    const tusky = new Tusky({ wallet: { keypair } })
    await tusky.auth.signIn()

    const vault = await tusky.vault.get(vaultId)
    // const { id: vaultId } = await tusky.vault.create(
    //   'open-training-data-protocol',
    //   {
    //     encrypted: false,
    //   }
    // )

    console.log('vaultId', vault.id)

    const fileName = 'bike.fit'
    const filePath = path.join(
      process.cwd(),
      'app',
      'api',
      'list',
      'files',
      fileName
    )

    const fileBuffer = await fs.readFile(filePath)

    const uploadId = await tusky.file.upload(vault.id, fileBuffer)
    const fileMetadata = await tusky.file.get(uploadId)

    console.log(fileMetadata, uploadId)

    return NextResponse.json(
      { uploadId, blobId: fileMetadata.blobId },
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
