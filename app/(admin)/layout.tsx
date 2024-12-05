import { FC, ReactNode } from 'react'

interface Props {
   children: ReactNode
}

const AuthLayout: FC<Props> = ({ children }) => {
   return (
      <main className="h-dvh w-full bg-red-500 grid grid-cols-1">
         <div className="lg:container lg:max-w-[1204px] lg:px-1r w-full center">{children}</div>
      </main>
   )
}

export default AuthLayout
