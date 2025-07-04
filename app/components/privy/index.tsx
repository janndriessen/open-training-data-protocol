import { useLoginWithEmail, usePrivy } from '@privy-io/react-auth'

import { Button } from '@/components/ui/button'

// TODO: callback on login - or track in page
export function PrivyConnect() {
  const { ready, login } = usePrivy()

  if (!ready) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Button
        onClick={() => login()}
        size="lg"
        className="text-lg px-8 py-4 rounded-full bg-black text-white hover:bg-gray-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        {'Connect'}
      </Button>
    </div>
  )
}
