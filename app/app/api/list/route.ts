import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
// @ts-expect-error: No types for 'fit-file-parser'
import FitParser from 'fit-file-parser'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')

  if (!type || (type !== 'bike' && type !== 'run')) {
    return NextResponse.json(
      { error: 'Invalid or missing type.' },
      { status: 400 }
    )
  }

  const fileName = type === 'bike' ? 'bike.fit' : 'run.fit'
  const filePath = path.join(
    process.cwd(),
    'app',
    'api',
    'list',
    'files',
    fileName
  )
  console.log(filePath)

  try {
    const fileBuffer = await fs.readFile(filePath)
    const fitParser = new FitParser({
      force: true,
      speedUnit: 'km/h',
      lengthUnit: 'km',
      temperatureUnit: 'celsius',
      elapsedRecordField: true,
    })

    const parsedData: any = await new Promise((resolve, reject) => {
      fitParser.parse(fileBuffer, (error: any, data: any) => {
        if (error) reject(error)
        else resolve(data)
      })
    })

    const session = parsedData.sessions[0]
    console.log(session !== undefined, 'session exists')
    const totalDistanceKm = session.total_distance
    const movingTimeSec = session.total_timer_time
    const elapsedTimeSec = session.total_elapsed_time

    // Compute average speed (km/h)
    const avgSpeedKph = totalDistanceKm / (movingTimeSec / 3600)
    // Compute average pace (min/km)
    const avgPaceMinPerKm = movingTimeSec / 60 / totalDistanceKm

    const summary = {
      total_distance_km: Number(totalDistanceKm.toFixed(2)),
      moving_time_sec: movingTimeSec,
      elapsed_time_sec: elapsedTimeSec,
      average_speed_kph: Number(avgSpeedKph.toFixed(2)),
      average_pace_min_per_km: Number(avgPaceMinPerKm.toFixed(2)),
    }

    return NextResponse.json({
      session,
      summary,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to parse .fit file' },
      { status: 500 }
    )
  }
}
