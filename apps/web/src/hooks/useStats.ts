import {ApplicationStatusStats} from 'lib'
import {useFetch} from 'use-http'

export const useStats = () => {
  const {loading, error, data} = useFetch<ApplicationStatusStats>('/jobs/stats', {}, [])

  return { stats: data?.stats, loading, error}
}