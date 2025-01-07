import CacheProvider from '@/lib/Cache'
import { Toaster } from 'sonner'
import { Cairo } from 'next/font/google'
const cairo = Cairo({
   subsets: ['arabic'],
   weight: ['400', '600', '700'], // Choose the weights you need
})

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html lang="en">
         <body className={cairo.className}>
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
