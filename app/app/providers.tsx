'use client'

import { PrivyProvider } from '@privy-io/react-auth'
import { zircuit, zircuitTestnet } from 'viem/chains'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      clientId={process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID!}
      config={{
        appearance: {
          accentColor: '#6A6FF5',
          theme: '#222224',
          showWalletLoginFirst: false,
          logo: 'https://auth.privy.io/logos/privy-logo-dark.png',
          walletChainType: 'ethereum-only',
          walletList: [
            'detected_ethereum_wallets',
            'metamask',
            'coinbase_wallet',
            'rainbow',
            'wallet_connect',
          ],
        },
        defaultChain: zircuit,
        supportedChains: [zircuit, zircuitTestnet],
        loginMethods: ['email', 'wallet'],
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
          requireUserPasswordOnCreate: false,
          ethereum: {
            createOnLogin: 'users-without-wallets',
          },
          solana: {
            createOnLogin: 'off',
          },
        },
        mfa: {
          noPromptOnMfaRequired: false,
        },
      }}
    >
      {children}
    </PrivyProvider>
  )
}
