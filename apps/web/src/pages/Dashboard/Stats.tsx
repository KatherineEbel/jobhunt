// import { useAppContext } from 'context/appContext'
// import { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'

import {useAppContext} from 'context/appContext'
import {Loader} from 'ui'

const Stats = () => {
  const { user, jobs } = useAppContext()

  if (!jobs) return <Loader/>

  return (
    <div>
      <h1>Stats</h1>
      <p>Welcome back {user?.firstName}</p>
    </div>
  )
}

export default Stats
