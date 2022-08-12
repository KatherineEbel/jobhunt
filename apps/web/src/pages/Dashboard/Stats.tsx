import {createAlert} from 'features/alert/alertSlice'
import {logout} from 'features/auth/authSlice'
import {useAppDispatch} from 'hooks/store'
import {useStatsQuery} from 'services/jobHuntApi'
import {Chart, Loader, StatList} from 'ui'


const Stats = () => {
  const {data, isFetching, error} = useStatsQuery(undefined)
  const dispatch = useAppDispatch()

  if (error) {
    if ('status' in error) {
      if (error.status === 401) {
        dispatch(createAlert({type: 'danger', message: 'Session expired, please log back in'}))
        setTimeout(() => {
          dispatch(logout())
        }, 3000)
      }
    }
  }


  return (
    <div>
      <Loader loading={isFetching}/>
      <StatList stats={data?.stats}/>
      {data?.stats.applications && <Chart totals={data.stats.applications}/>}
    </div>
  )
}

export default Stats
