import {CreateJobRequest, CreateJobResponse, JobResponse, PageData, UserJobsResponse} from 'lib'
import {useCallback, useMemo, useState} from 'react'
import {useFetch} from 'use-http'

export function useJobs() {
  const [jobs, setJobs] = useState<JobResponse[]>([])
  const [pageData, setPageData] = useState<PageData>()
  const [page] = useState(1)

  const {post, response, error} = useFetch<CreateJobResponse>('/jobs')
  const {error: getAllJobsErr, loading} = useFetch<UserJobsResponse>('/jobs', {
    onNewData: (currJobs: UserJobsResponse, newJobs: UserJobsResponse) => {
      const {jobs: nJ, ...pageData} = newJobs
      setJobs([...jobs, ...nJ])
      setPageData(pageData)
      return [...jobs, ...nJ]
    },
    perPage: 6,
  }, [page])

  const jobError = useMemo(() => {
    if (error) return error.message
    if (getAllJobsErr) return getAllJobsErr.message
  }, [error, getAllJobsErr])


  const addJob = useCallback(
    async (request: CreateJobRequest): Promise<boolean> => {
      const {job } = await post(request)
      if (response.ok) {
        setJobs(jobs ? [...jobs, job] : [job])
        return true
      }
      // if (error) setFetchError(error.message)
      return false
    }, []
  )

  return { addJob, jobs, error: jobError || null, loading, pageData }
}