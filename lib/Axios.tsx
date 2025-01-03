import axios, { AxiosInstance } from 'axios'

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api'

function createAxiosInstance({ withAuth }: { withAuth: boolean } = { withAuth: false }): AxiosInstance {
   const axiosInstance = axios.create({
      baseURL: baseURL, // Ensure this matches your backend URL
      withCredentials: true, // Required if you use cookies or send Authorization headers
   })

   // Add request interceptor
   axiosInstance.interceptors.request.use(
      (config) => {
         console.log('Outgoing Request:', {
            method: config.method,
            url: config.url,
            headers: config.headers,
            data: config.data,
            params: config.params,
         })
         return config
      },
      (error) => {
         console.error('Request Error:', error)
         return Promise.reject(error)
      },
   )

   // Add response interceptor
   axiosInstance.interceptors.response.use(
      (response) => {
         console.log('Incoming Response:', {
            status: response.status,
            data: response.data,
            headers: response.headers,
            config: response.config,
         })
         return response
      },
      (error) => {
         if (error.response) {
            console.error('Response Error:', {
               status: error.response.status,
               data: error.response.data,
               headers: error.response.headers,
            })
         } else {
            console.error('Request Error (No Response):', error.message)
         }
         return Promise.reject(error)
      },
   )

   return axiosInstance
}

const axiosInstance = createAxiosInstance({ withAuth: false })
export { axiosInstance }
