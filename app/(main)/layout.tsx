import '../globals.css'
import Navbar from '@/components/common/Navbar'
import Footer from '@/components/ui/Footer'

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <div className={`antialiased bg-primary-dark relative  overscroll-none w-dvw overflow-x-clip   `}>
         {/* <div className="fixed top-0 right-0 col-span-full w-full h-fit   z-[999] ">
            <Navbar />
         </div> */}
         {children}
         {/* <Footer /> */}
      </div>
   )
}
