import {useAppContext} from 'context/appContext'
import {useStats} from 'hooks/useStats'
import {useEffect} from 'react'
import {Chart, Loader, StatList} from 'ui'

const Stats = () => {
  const { displayAlert} = useAppContext()
  const { stats, loading, error} = useStats()

  useEffect(() => {
    if (error) {
      displayAlert({type: 'danger', message: error.message})
    }
  }, [error])

  useEffect(() => {
    console.log(loading)
  }, [loading])



  if (loading) return <Loader/>

  return (
    <div>
      <StatList stats={stats}/>
      {stats?.applications && <Chart totals={stats.applications}/>}
    </div>
  )
}

export default Stats
