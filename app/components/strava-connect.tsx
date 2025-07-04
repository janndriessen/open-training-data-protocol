import { Button } from '@/components/ui/button'

export function StravaConnectButton({ onClick }: { onClick: () => void }) {
  const handleConnect = () => {
    // TODO: connect to strava
    console.log('Connecting to Strava...')
    onClick()
  }

  return (
    <div className="flex items-center justify-center my-4">
      <Button
        onClick={handleConnect}
        className="bg-[#FC4C02] hover:bg-[#E73C00] text-white font-semibold px-8 py-3 text-lg transition-colors duration-200 shadow-lg hover:shadow-xl cursor-pointer"
        size="lg"
      >
        Connect with Strava
      </Button>
    </div>
  )
}
