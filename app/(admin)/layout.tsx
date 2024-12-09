import { FC, ReactNode } from 'react'
import '../globals.css'
interface Props {
   children: ReactNode
}

const AdminLayout: FC<Props> = ({ children }) => {
   return (
      <div className="h-dvh w-full bg-background-dark grid grid-cols-1">
         <div className="w-full center">{children}</div>
      </div>
   )
}

export default AdminLayout
