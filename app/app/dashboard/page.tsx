'use client'

import { useState } from 'react'

import { ChartAreaInteractive } from '@/components/chart-area-interactive'
import { DataTable } from '@/components/data-table'
import { MapSouthBeach } from '@/app/components/map-south-beach'
import { SectionCards } from '@/components/section-cards'
import { SiteHeader } from '@/components/site-header'
import { TopStats } from '@/components/top-stats'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { StoringTrainingPopup } from '@/components/store-popup'
import { useActivity } from '@/hooks/use-activity'
import { Skeleton } from '@/components/ui/skeleton'

export default function Page() {
  const [isStoringTrainingPopupOpen, setIsStoringTrainingPopupOpen] =
    useState(false)

  const { data: activityData, isLoading, storeActivity } = useActivity()
  console.log(activityData)

  const handleStoreClick = () => {
    storeActivity(null)
    setIsStoringTrainingPopupOpen(true)
  }

  if (isLoading) {
    return (
      <SidebarProvider
        style={
          {
            '--sidebar-width': 'calc(var(--spacing) * 72)',
            '--header-height': 'calc(var(--spacing) * 12)',
          } as React.CSSProperties
        }
      >
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col px-4">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-40 w-full" />
                <div className="px-4 lg:px-6">
                  <Skeleton className="h-64 w-full" />
                </div>
                <Skeleton className="h-80 w-full" />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
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
              <TopStats data={activityData} onClick={handleStoreClick} />
              <SectionCards data={activityData} />
              <MapSouthBeach />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable />
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
