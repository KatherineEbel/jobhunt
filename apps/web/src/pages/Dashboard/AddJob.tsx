import {useAppContext} from 'context/appContext'
import {CreateJobRequest} from 'lib'
import {useMemo} from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'
import { JobForm} from 'ui'

const AddJob = () => {
  const { addJob, editJob, jobs } = useAppContext()
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const jobId = searchParams.get('jobId')

  const job = useMemo(() => {
    if (!jobId) return undefined
    const match = jobs.find(j => j.id === jobId)
    if (match) {
      const {position, location, company, status, contract} = match
      return {position, location, company, status, contract}
    }
  }, [jobId])

  const handleSubmit = async (values: CreateJobRequest) => {
    console.log(values)
    const success = jobId && job ? await editJob(jobId, values) : await addJob(values)
    if (success) {
      navigate('/jobs')
    }
    return success
  }
  return <>
    <h1>{jobId ? 'Edit' : 'Add'} Job</h1>
    <JobForm onSubmit={handleSubmit} job={job} />
  </>
}

export default AddJob
