'use client'

import { usePrivy } from '@privy-io/react-auth'

import { Button } from '@/components/ui/button'

export function SiteHeader() {
  const { ready, authenticated, logout } = usePrivy()

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        {/* <SidebarTrigger className="-ml-1" /> */}
        {/* <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        /> */}
        <h1 className="text-base font-medium">Open Training Data Protocol</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <a
              href="https://github.com/janndriessen/open-training-data-protocol"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              GitHub
            </a>
          </Button>
          {ready && authenticated && (
            <Button
              variant="ghost"
              asChild
              size="sm"
              className="hidden sm:flex"
            >
              <button
                onClick={async () => {
                  const result = logout()
                  if (result && typeof result.then === 'function') {
                    await result
                  }
                  window.location.href = '/'
                }}
              >
                Logout
              </button>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
