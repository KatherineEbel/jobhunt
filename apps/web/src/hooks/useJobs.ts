import {CreateJobRequest, CreateJobResponse, UserJobsResponse} from 'lib'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {useFetch} from 'use-http'

export function useJobs(authenticated = false) {
  const [jobData, setJobData] = useState<UserJobsResponse>({jobs: [], count: 0, pages: 1})
  const {get, loading, error: getJobsError} = useFetch<UserJobsResponse>('/jobs')

  useEffect(() => {
    if (!authenticated) return setJobData({jobs: [], count: 0, pages: 1})
    ;(async () => {
      const data = await get()
      setJobData(data)
    })()
  }, [authenticated])

  const {del, patch, post, response, error} = useFetch<CreateJobResponse>('/jobs')
  const jobError = useMemo(() => {
    if (error) return error.message
    if (getJobsError) return getJobsError.message
  }, [error, getJobsError])

  const addJob = useCallback(
    async (request: CreateJobRequest): Promise<boolean> => {
      const {job} = await post(request)
      if (response.ok) {
        setJobData({...jobData, jobs: [...jobData.jobs, job]})
        return true
      } else {
        console.log('NOT OK response', response.status)
      }
      return false
    }, []
  )

  const editJob = useCallback(
    async (jobId: string, request: CreateJobRequest): Promise<boolean> => {
      const {job} = await patch(`/${jobId}`, request)
      if (response.ok) {
        setJobData({...jobData, jobs: jobData.jobs.map(j => j.id === jobId ? job : j)})
        return true
      }
      return false
    }, [])

  const deleteJob = useCallback(
    async (jobId: string) => {
      await del(`/${jobId}`)
      if (response.ok) {
        const updatedJobs = jobData.jobs.filter(j => j.id !== jobId)
        setJobData({...jobData, jobs: updatedJobs})
        return true
      }
      return false
    }, [])

  return {addJob, deleteJob, editJob, ...jobData, error: jobError || null, loading}
}