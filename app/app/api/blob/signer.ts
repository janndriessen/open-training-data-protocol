import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519'
import { publicKeyToAddress, toHex } from 'viem/utils'

const secretKey = process.env.SUI_SIGNER_SECRET_KEY!

export function getSigner() {
  const keypair = Ed25519Keypair.fromSecretKey(secretKey)

  console.log(
    'Public key address',
    publicKeyToAddress(toHex(keypair.getPublicKey().toRawBytes()))
  )

  return keypair
}
