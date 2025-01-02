import '../globals.css'
import Navbar from '@/components/common/Navbar'
import Footer from '@/components/ui/Footer'

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <div className={`antialiased bg-primary-dark relative  overscroll-none  overflow-x-clip   `}>
         <Navbar />

         {children}
         <Footer />
      </div>
   )
}
