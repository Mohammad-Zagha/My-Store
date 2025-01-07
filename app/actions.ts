   import { cookies } from "next/headers";

   export async function decodeToken()
   {
   try {
      const accessToken = cookies().get('AccessToken')?.value || undefined;
      return accessToken
      
   } catch (error) {
      return null
   }
   }