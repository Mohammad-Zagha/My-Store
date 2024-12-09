import CacheProvider from '@/lib/Cache'
import { Toaster } from 'sonner'

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html lang="en">
         <body>
            <CacheProvider>
               {children}
               <Toaster
                  position={'bottom-right'}
                  richColors
                  visibleToasts={6}
                  closeButton
                  expand
                  toastOptions={{
                     closeButton: true,
                  }}
                  duration={3000}
               />
            </CacheProvider>
         </body>
      </html>
   )
}
