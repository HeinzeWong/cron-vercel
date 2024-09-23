import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export const config = {
  runtime: 'edge',
}

export default async function handler(req: NextRequest) {
  const cronKey = req.nextUrl.searchParams.get('cronKey')
  if (!cronKey) return new Response('No cronKey provided', { status: 400 })
  const { stock, fetchedAt, productName } =
    (await kv.get<{
      productName: string
      fetchedAt: string
      stock: number
    } | null>(cronKey)) || {}
  
  return new NextResponse(
    JSON.stringify({
      fetchedAt,
      stock,
      productName
    }),
    {
      status: 200,
    }
  )
}
