import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Hex, toHex } from 'viem'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Encode blobId base64 encoded string to bytes32
export function stringToBytes32(blobId: string): `0x${string}` {
  const bytes = Buffer.from(blobId, 'base64')
  if (bytes.length > 32) {
    throw new Error('blobId too long to fit in bytes32')
  }
  return toHex(bytes)
}
