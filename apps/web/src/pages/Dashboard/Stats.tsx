import {useAppContext} from 'context/appContext'
import {useStats} from 'hooks/useStats'
import {useEffect} from 'react'
import {Loader} from 'ui'
import {StatList} from 'ui'

const Stats = () => {
  const { displayAlert} = useAppContext()
  const { stats, loading, error} = useStats()

  useEffect(() => {
    if (error) {
      displayAlert({type: 'danger', message: error.message})
    }
  }, [error])

  if (loading || !stats) return <Loader/>

  return (
    <div>
      <StatList stats={stats}/>
    </div>
  )
}

export default Stats
