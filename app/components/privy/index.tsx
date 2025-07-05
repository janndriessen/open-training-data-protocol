import { useLogin, usePrivy } from '@privy-io/react-auth'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

// TODO: callback on login - or track in page
export function PrivyConnect({ onConnect }: { onConnect: () => void }) {
  const { ready, authenticated } = usePrivy()
  const { login } = useLogin({
    onComplete: ({ user, isNewUser }) => {
      console.log('user', user)
      console.log('isNewUser', isNewUser)
      onConnect
    },
  })

  if (!ready) {
    return <div>Loading...</div>
  }

  useEffect(() => {
    if (authenticated) {
      onConnect()
    }
  }, [authenticated, onConnect])

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
