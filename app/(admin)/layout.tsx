import { FC, ReactNode } from 'react'
import '../globals.css'
interface Props {
   children: ReactNode
}

const AdminLayout: FC<Props> = ({ children }) => {
   return (
      <html lang="en">
         <body className="h-dvh w-full bg-background-dark grid grid-cols-1">
            <div className="  w-full center">{children}</div>
         </body>
      </html>
   )
}

export default AdminLayout
