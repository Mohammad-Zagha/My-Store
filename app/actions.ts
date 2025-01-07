   import { cookies } from "next/headers";
   import { setCookie, deleteCookie, getCookie, getCookies, hasCookie } from 'cookies-next';

   export async function decodeToken()
   {
   try {
      const accessToken = getCookie('AccessToken');
      return accessToken
      
   } catch (error) {
      return null
   }
   }