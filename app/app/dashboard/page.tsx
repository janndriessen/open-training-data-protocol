'use client'

import { useState } from 'react'

import { ChartAreaInteractive } from '@/components/chart-area-interactive'
import { DataTable } from '@/components/data-table'
import { SectionCards } from '@/components/section-cards'
import { SiteHeader } from '@/components/site-header'
import { TopStats } from '@/components/top-stats'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { StoringTrainingPopup } from '@/components/store-popup'
import { useActivity, ActivityProvider } from '@/hooks/use-activity'

import data from './data.json'

export default function Page() {
  const [isStoringTrainingPopupOpen, setIsStoringTrainingPopupOpen] =
    useState(false)

  const { storeActivity } = useActivity()

  const handleStoreClick = () => {
    storeActivity(null)
    setIsStoringTrainingPopupOpen(true)
  }

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      {/* <AppSidebar variant="inset" /> */}
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <TopStats onClick={handleStoreClick} />
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
        <StoringTrainingPopup
          isOpen={isStoringTrainingPopupOpen}
          onClose={() => setIsStoringTrainingPopupOpen(false)}
          type="run"
        />
      </SidebarInset>
    </SidebarProvider>
  )
}
