import {createAlert} from 'features/alert/alertSlice'
import {useAppDispatch} from 'hooks/store'
import {useEffect} from 'react'
import {useStatsQuery} from 'services/jobHuntApi'
import {Chart, Loader, StatList} from 'ui'

const Stats = () => {
  const {data, isLoading, isError, error} = useStatsQuery(undefined)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isError) {
      dispatch(createAlert({type: 'danger', message: 'Failed to fetch stats'}))
      console.log('ERROR', error)
    }
  }, [isError])

  if (isLoading) return <Loader/>

  return (
    <div>
      <StatList stats={data?.stats}/>
      {data?.stats.applications && <Chart totals={data.stats.applications}/>}
    </div>
  )
}

export default Stats
