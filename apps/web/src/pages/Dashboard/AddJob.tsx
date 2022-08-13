import {selectCurrentUser} from 'features/auth/authSlice'
import {selectJobs} from 'features/jobs/jobsSlice'
import {useAppDispatch, useTypedSelector} from 'hooks/store'
import {CreateJobRequest, JobResponse} from 'lib'
import {useEffect} from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'
import {useAddJobMutation, useEditJobMutation} from 'services/jobHuntApi'
import styled from 'styled-components'
import { JobForm} from 'ui'
import { ReactComponent as WorkAnywhere} from 'assets/images/undraw_working_from_anywhere.svg'

const StyledWorkAnywhere = styled(WorkAnywhere)`
  display: none;
  width: 90%;
  margin: 2rem auto;
  
  @media (min-width: 668px) {
    display: block;
  }
`

const AddJob = () => {
  const [addJob, {isSuccess: isAddSuccess,  }] = useAddJobMutation()
  const [editJob, {isSuccess: isEditSuccess}] = useEditJobMutation()
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const jobId = searchParams.get('jobId')
  const job = useTypedSelector(selectJobs).find((j: JobResponse) => j.id === jobId)
  const currentUser = useTypedSelector(selectCurrentUser)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!(isAddSuccess || isEditSuccess)) return
    navigate('/jobs')
  }, [dispatch, isAddSuccess, isEditSuccess, navigate])

  const handleSubmit = async (values: CreateJobRequest) => {
    if (job && jobId) {
      editJob({...values, jobId})
    } else {
      addJob(values)
    }
  }
  return <>
    <h1>{jobId ? 'Edit' : 'Add'} Application</h1>
    <JobForm onSubmit={handleSubmit} location={currentUser?.location} job={job} isSuccess={isEditSuccess || isAddSuccess} />
    <StyledWorkAnywhere/>
  </>
}

export default AddJob
