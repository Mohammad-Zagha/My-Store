import { cookies } from "next/headers"

export async function getCookieValue<T = string>(key: string): Promise<T | null> {
    const cookieValue = cookies().get(key)?.value || ''
    return cookieValue ? JSON.parse(JSON.stringify(cookieValue)) : null
 }