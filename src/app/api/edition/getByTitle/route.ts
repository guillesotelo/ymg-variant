import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import { retryWithDelay } from 'src/helpers'

const API_URL = process.env.NEXT_PUBLIC_API_URL
export async function GET(request: NextRequest) {
    const title = request.nextUrl.searchParams.get('title')
    try {
        const res = await retryWithDelay(() => axios.get(`${API_URL}/api/edition/getByTitle`, { params: { title } }), 5, 100)
        return NextResponse.json(res.data)
    } catch (err: any) {
        console.error("Next API Error: ", err)
        return NextResponse.json({ error: err.code }, { status: err.status })
    }
}