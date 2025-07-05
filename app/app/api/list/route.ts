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

    const parsedData = await new Promise((resolve, reject) => {
      fitParser.parse(fileBuffer, (error: any, data: any) => {
        if (error) reject(error)
        else resolve(data)
      })
    })

    return NextResponse.json(parsedData)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to parse .fit file' },
      { status: 500 }
    )
  }
}
