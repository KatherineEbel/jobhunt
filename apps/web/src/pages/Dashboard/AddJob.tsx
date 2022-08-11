import {selectJobs} from 'features/jobs/jobsSlice'
import {useTypedSelector} from 'hooks/store'
import {CreateJobRequest, JobResponse} from 'lib'
import {useNavigate, useSearchParams} from 'react-router-dom'
import {useAddJobMutation, useEditJobMutation} from 'services/jobHuntApi'
import { JobForm} from 'ui'

const AddJob = () => {
  const [addJob, {isSuccess: isAddSuccess}] = useAddJobMutation()
  const [editJob, {isSuccess: isEditSuccess}] = useEditJobMutation()
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const jobId = searchParams.get('jobId')
  const job = useTypedSelector(selectJobs).find((j: JobResponse) => j.id === jobId)

  if (isAddSuccess || isEditSuccess) {
    navigate('/jobs')
  }

  const handleSubmit = async (values: CreateJobRequest) => {
    if (job && jobId) {
      editJob({...values, jobId})
    } else {
      addJob(values)
    }
  }
  return <>
    <h1>{jobId ? 'Edit' : 'Add'} Job</h1>
    <JobForm onSubmit={handleSubmit} job={job} isSuccess={isEditSuccess || isAddSuccess} />
  </>
}

export default AddJob
