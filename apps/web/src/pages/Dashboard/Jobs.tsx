import {createAlert} from 'features/alert/alertSlice'
import {useAppDispatch} from 'hooks/store'
import {JobQuery} from 'lib'
import {useState} from 'react'
import {useDeleteJobMutation, useJobsQuery} from 'services/jobHuntApi'
import {JobList, Loader, SearchForm, SearchFormValues} from 'ui'

const Jobs = () => {
  const dispatch = useAppDispatch()
  const [query] = useState<Partial<JobQuery>>({})
  const { data, error, isLoading } = useJobsQuery(query)
  const [deleteJob, {isError}]  = useDeleteJobMutation()

  if (error) {
    dispatch(createAlert({type: 'danger', message: 'Failed to fetch jobs'}))
    console.log(error)
  }

  if (isError) {
    dispatch(createAlert({type: 'danger', message: 'Failed to delete job'}))
  }

  if (isLoading) return <Loader/>

  const onSubmit = (values: SearchFormValues) => {
    console.log(values)
  }
  return <>
    <SearchForm onSubmit={onSubmit}/>
    <JobList jobs={data?.jobs || []}  onDeleteJob={deleteJob}/>
  </>
}

export default Jobs
