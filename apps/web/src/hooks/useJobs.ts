import {AuthUser, CreateJobRequest, CreateJobResponse, Job} from 'lib'
import {useCallback, useEffect, useState} from 'react'
import {useFetch} from 'use-http'
const BASE_URL = process.env.REACT_APP_API_URL

export function useJobs(user: AuthUser | null, initialJobs: Job[] | null) {
  const [jobs, setJobs] = useState<Job[] | null>(initialJobs)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const {post, response, error} = useFetch<CreateJobResponse>(BASE_URL)
  const fetch = useFetch(BASE_URL)

  useEffect(() => {
    if (!user || jobs) return
    (async () => {
      const dbJobs = await fetch.get('/jobs')
      if (fetch.error) {
        setFetchError(fetch.error.message)
        setJobs([])
        return
      }
      if (dbJobs && dbJobs.error) {
        setFetchError(dbJobs.error)
        return
      }
      setJobs(dbJobs)
    })()
  }, [user])

  const addJob = useCallback(
    async (request: CreateJobRequest): Promise<boolean> => {
      const {job } = await post('/jobs', request)
      if (response.ok) {
        setJobs(jobs ? [...jobs, job] : [job])
        return true
      }
      if (error) setFetchError(error.message)
      return false
    }, []
  )

  return { addJob, jobs, error: fetchError || null }
}