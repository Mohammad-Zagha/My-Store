import axios, { AxiosInstance } from 'axios'

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? 'https://perfume-shop-backend.onrender.com/api'

function createAxiosInstance({ withAuth }: { withAuth: boolean } = { withAuth: false }): AxiosInstance {
   const axiosInstance = axios.create({
      baseURL: baseURL, // Ensure this matches your backend URL
      withCredentials: true, // Required if you use cookies or send Authorization headers
   })
   return axiosInstance
}

const axiosInstance = createAxiosInstance({ withAuth: false })
export { axiosInstance }
