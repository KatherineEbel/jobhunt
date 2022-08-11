import {selectCurrentUser} from 'features/auth/authSlice'
import {useTypedSelector} from 'hooks/store'
import {ReactElement} from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const user = useTypedSelector(selectCurrentUser)

  if (!user) return <Navigate to="/landing" replace={true} />

  return children
}

export default ProtectedRoute
