import {CreateJobRequest, CreateJobResponse, Job} from 'lib'
import {useCallback, useState} from 'react'
import {useFetch} from 'use-http'
const BASE_URL = process.env.REACT_APP_API_URL

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([])
  const {post, response, error} = useFetch<CreateJobResponse>(BASE_URL)

  const addJob = useCallback(
    async (request: CreateJobRequest): Promise<boolean> => {
      const {job } = await post('/jobs', request)
      if (response.ok) {
        setJobs([...jobs, job])
        return true
      }
      return false
    }, []
  )

  return { addJob, jobs, error: error?.message || null }
}