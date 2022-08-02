import { useAppContext } from 'context/appContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const { user } = useAppContext()
  const navigate = useNavigate()
  useEffect(() => {
    if (!user) {
      navigate('/register', { replace: true })
    }
  }, [user])

  if (!user) return null

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {user.name}</p>
    </div>
  )
}

export default Dashboard
