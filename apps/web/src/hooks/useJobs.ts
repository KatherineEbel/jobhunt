import {CreateJobRequest, CreateJobResponse, Job, UserJobsResponse} from 'lib'
import {useCallback, useEffect, useState} from 'react'
import {useFetch} from 'use-http'
const BASE_URL = process.env.REACT_APP_API_URL

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [fetchError, setFetchError] = useState<string | null>(null)
  const {post, response, error} = useFetch<CreateJobResponse>(BASE_URL)
  const {data, error: getAllJobsErr, loading} = useFetch<UserJobsResponse>(`${BASE_URL}/jobs`, {}, [])

  useEffect(() => {
    if (data) {
      setJobs(data.jobs)
    }
    if (error) {
      setFetchError(error.message)
    }
  }, [data, getAllJobsErr, loading])

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

  return { addJob, jobs, error: fetchError || null, loading }
}