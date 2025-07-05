// app/components/FitnessStats.tsx
'use client'

import { LineChart, Line, ResponsiveContainer } from 'recharts'

import { ListApiSuccessResponse } from '@/app/api/list/route'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const chartData = [
  { value: 0 },
  { value: 2 },
  { value: 3 },
  { value: 2.5 },
  { value: 5 },
  { value: 3.5 },
  { value: 2 },
]

export function TopStats({
  data,
  onClick,
}: {
  data: ListApiSuccessResponse
  onClick: () => void
}) {
  return (
    <div className="flex flex-row gap-4 px-6 w-full">
      <div className="flex flex-row space-x-4 flex-1">
        <Card className="p-8 flex-1">
          <CardContent className="p-0">
            <h2 className="text-gray-500 text-sm mb-2">
              {data.session.activity_type}
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl font-bold">
                  {data.summary.total_distance_km} km
                </div>
                <div className="text-gray-500 text-sm">315 Calories</div>
              </div>
              <div className="h-16 w-28">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#4F46E5"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="p-8 bg-gray-900 text-white flex-1">
        <CardContent className="p-0 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Nice {data.session.activity_type.toLowerCase()}!
            </h2>
            <Button variant="default" asChild size="sm">
              <button onClick={onClick}>Store onchain</button>
            </Button>
          </div>
          <div className="flex flew-row text-sm">
            <div className="flex flex-col text-left">
              <div className="text-gray-500">Average Speed</div>
              <div className="font-bold text-lg">
                {data.summary.average_speed_kph} km/h
              </div>
            </div>{' '}
            <Separator
              orientation="vertical"
              className="mx-4 data-[orientation=vertical]:h-12"
            />
            <div className="flex flex-col text-left">
              <div className="text-gray-500">Time</div>
              <div className="font-bold text-lg">
                {formatSecondsToMMSS(data.summary.moving_time_sec)}
              </div>
            </div>
            <Separator
              orientation="vertical"
              className="mx-4 data-[orientation=vertical]:h-12"
            />
            <div className="flex flex-col text-left">
              <div className="text-gray-500">Distance</div>
              <div className="font-bold text-lg">
                {data.summary.total_distance_km} km
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function formatSecondsToMMSS(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}
