import { useAppContext } from 'context/appContext'
import {ReactElement, useEffect, useState} from 'react'
import { Navigate } from 'react-router-dom'
import {Loader} from 'ui'


const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  const { authenticate } = useAppContext()


  useEffect(() => {
    (async () => {
      setAuthenticated(await authenticate())
    })()
  }, [])

  if (authenticated === null) {
    return <Loader/>
  }

  if (!authenticated) return <Navigate to="/landing" replace={true} />

  return children
}

export default ProtectedRoute
