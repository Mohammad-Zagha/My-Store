'use client'

// Since QueryClientProvider relies on useContext under the hood, we have to put 'use client' on top
import { isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query'

function makeQueryClient() {
   return new QueryClient({
      defaultOptions: {
         queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 5 * 60 * 1000, // 5 minute // cache will be revalidated every 5 minutes
            refetchOnWindowFocus: false, // don't refetch on window focus
            refetchOnMount: false, // don't refetch on mount
            retry: false, // don't retry on failure
         },
         mutations: {
            onError: (error) => {},
            retry: false,
         },
      },
   })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
   if (isServer) {
      // Server: always make a new query client
      return makeQueryClient()
   } else {
      // Browser: make a new query client if we don't already have one
      // This is very important, so we don't re-make a new client if React
      // suspends during the initial render. This may not be needed if we
      // have a suspense boundary BELOW the creation of the query client
      if (!browserQueryClient) browserQueryClient = makeQueryClient()
      return browserQueryClient
   }
}

// Export the browser query client for use outside of React components
export function getGlobalQueryClient() {
   if (!isServer && browserQueryClient) {
      return browserQueryClient
   }
   throw new Error('Attempted to access QueryClient on the server or before initialization')
}

export default function CacheProvider({ children }: Readonly<{ children: React.ReactNode }>) {
   // NOTE: Avoid useState when initializing the query client if you don't
   //       have a suspense boundary between this and the code that may
   //       suspend because React will throw away the client on the initial
   //       render if it suspends and there is no boundary
   const queryClient = getQueryClient()

   return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
