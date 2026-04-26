import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, name, items, total } = await request.json()

    const order = {
      id: Date.now().toString(),
      name,
      email,
      items,
      total,
      date: new Date().toISOString()
    }

    return NextResponse.json({ success: true, order })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error procesando orden' }, { status: 500 })
  }
}
