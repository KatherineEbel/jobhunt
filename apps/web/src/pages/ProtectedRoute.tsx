import { useAppContext } from 'context/appContext'
import {ReactElement} from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const { user } = useAppContext()

  if (!user) return <Navigate to="/landing" replace={true} />

  return children
}

export default ProtectedRoute
