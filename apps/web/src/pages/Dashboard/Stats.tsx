// import { useAppContext } from 'context/appContext'
// import { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'

import {useAppContext} from 'context/appContext'

const Stats = () => {
  const { user} = useAppContext()

  return (
    <div>
      <h1>Stats</h1>
      <p>Welcome back {user?.firstName}</p>
    </div>
  )
}

export default Stats
