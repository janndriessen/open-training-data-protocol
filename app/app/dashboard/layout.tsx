import { ActivityProvider } from '@/hooks/use-activity'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ActivityProvider type="run">{children}</ActivityProvider>
}
