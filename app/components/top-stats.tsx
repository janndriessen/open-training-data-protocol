// app/components/FitnessStats.tsx
'use client'

import { LineChart, Line, ResponsiveContainer } from 'recharts'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const data = [
  { value: 0 },
  { value: 2 },
  { value: 3 },
  { value: 2.5 },
  { value: 5 },
  { value: 3.5 },
  { value: 2 },
]

export function TopStats({ onClick }: { onClick: () => void }) {
  return (
    <div className="min-w-sm mx-auto space-y-4">
      <div className="flex flex-row space-x-4">
        <Card className="p-4">
          <CardContent className="p-0">
            <h2 className="text-gray-500 text-sm mb-2">Recent Activity</h2>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl font-bold">8,31K</div>
                <div className="text-gray-500 text-sm">313 Calories</div>
              </div>
              <div className="h-16 w-28">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
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
        <Button variant="default" asChild size="sm">
          <button onClick={onClick}>Store onchain</button>
        </Button>
      </div>
      <Card className="p-4 bg-black text-white">
        <CardContent className="p-0 space-y-4">
          <div className="flex">
            <h2 className="text-lg font-semibold">Weekly Record!</h2>
          </div>
          <div className="flex flew-row text-sm">
            <div className="flex flex-col text-left">
              <div className="text-gray-500">Activities</div>
              <div className="font-bold text-lg">5</div>
            </div>{' '}
            <Separator
              orientation="vertical"
              className="mx-4 data-[orientation=vertical]:h-12"
            />
            <div className="flex flex-col text-left">
              <div className="text-gray-500">Time</div>
              <div className="font-bold text-lg">7h 54m</div>
            </div>
            <Separator
              orientation="vertical"
              className="mx-4 data-[orientation=vertical]:h-12"
            />
            <div className="flex flex-col text-left">
              <div className="text-gray-500">Distance</div>
              <div className="font-bold text-lg">95.31K</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
