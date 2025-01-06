import { cookies } from "next/headers"

export async function getCookie(key: string): Promise<string | null> {
    const cookieValue = cookies().get(key)?.value || ''
    return cookieValue  
 }

 export  async function logCookie() {
    const cookieStore =  cookies()
    console.log(cookieStore)
    return

 }
