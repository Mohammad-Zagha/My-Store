import { cookies } from "next/headers";

export async function decodeToken()
{
try {
   const accessToken = (await cookies().get('AccessToken')?.value) || ''
   return accessToken
   
} catch (error) {
   return null
}
}