export const dynamic = 'force-dynamic' // Force dynamic rendering for this route

import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import { retryWithDelay } from 'src/helpers'
import { getToken } from '../../(helpers)'
import { revalidatePath } from 'next/cache'

const API_URL = process.env.NEXT_PUBLIC_API_URL
export async function POST(request: NextRequest) {
    try {
        const token = await getToken(request)
        const config = { headers: { authorization: `Bearer ${token}` } }
        const data = await request.json()
        const res = await retryWithDelay(() => axios.post(`${API_URL}/api/edition/create`, data, config), 5, 100)
        revalidatePath('/')
        return NextResponse.json(res.data)
    } catch (err: any) {
        console.error("Next API Error: ", err)
        return NextResponse.json({ error: err.code }, { status: err.status })
    }
}