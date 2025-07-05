import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { toBytes, pad } from 'viem'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Encode uploadId string to bytes32 (zero-padded)
export function stringToBytes32(uploadId: string): `0x${string}` {
  const bytes = toBytes(uploadId) // UTF-8 encoded bytes
  if (bytes.length > 32) {
    throw new Error('uploadId too long to fit in bytes32')
  }
  const padded = pad(bytes, { size: 32 })
  return `0x${Buffer.from(padded).toString('hex')}`
}

// Decode bytes32 back to string (trimming trailing zeros)
export function bytes32ToString(bytes32: `0x${string}`): string {
  const bytes = Buffer.from(bytes32.slice(2), 'hex')
  const trimmed = bytes.subarray(
    0,
    bytes.indexOf(0) >= 0 ? bytes.indexOf(0) : bytes.length
  )
  return new TextDecoder().decode(trimmed)
}
