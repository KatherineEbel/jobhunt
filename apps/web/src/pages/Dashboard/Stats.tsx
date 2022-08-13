import {enqueueAlert} from 'features/alert/alertSlice'
import {logout} from 'features/auth/authSlice'
import {useAppDispatch} from 'hooks/store'
import {useStatsQuery} from 'services/jobHuntApi'
import styled from 'styled-components'
import {Chart, Loader, StatList} from 'ui'
import { ReactComponent as Placeholder } from 'assets/images/undraw_performance_overview.svg'

const StyledPlaceholder = styled(Placeholder)`
  margin: 2rem auto;
  width: 100%;
`


const Stats = () => {
  const {data, isFetching, error} = useStatsQuery(undefined)
  const dispatch = useAppDispatch()

  if (error) {
    if ('status' in error) {
      if (error.status === 401) {
        dispatch(enqueueAlert({type: 'danger', message: 'Session expired, please log back in'}))
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
      {data?.stats.applications ? (<Chart totals={data.stats.applications}/>) : (
        <StyledPlaceholder/>
      )}
    </div>
  )
}

export default Stats
