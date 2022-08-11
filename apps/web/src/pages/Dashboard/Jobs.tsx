import {createAlert} from 'features/alert/alertSlice'
import {useAppDispatch} from 'hooks/store'
import {JobQuery} from 'lib'
import {useState} from 'react'
import {useDeleteJobMutation, useJobsQuery} from 'services/jobHuntApi'
import {JobList, Loader, SearchForm, SearchFormValues} from 'ui'

const Jobs = () => {
  const dispatch = useAppDispatch()
  const [query, setQuery] = useState<Partial<JobQuery>>({})
  const { data, error, isLoading, refetch } = useJobsQuery(query)
  const [deleteJob, {isError}]  = useDeleteJobMutation()

  if (error) {
    dispatch(createAlert({type: 'danger', message: 'Failed to fetch jobs'}))
    console.log(error)
  }

  if (isError) {
    dispatch(createAlert({type: 'danger', message: 'Failed to delete job'}))
  }

  const onSubmit = (values: SearchFormValues) => {
    const { status, contract} = values
    setQuery({
      ...values,
      status: status === 'all' ? undefined : status,
      contract: contract === 'all' ? undefined : contract
    })
    refetch()
  }

  const clearFilters = () => {
    setQuery({})
    refetch()
  }
  
  if (isLoading) return <Loader/>

  return <>
    <SearchForm onSubmit={onSubmit} onReset={clearFilters}/>
    <JobList jobs={data?.jobs || []}  onDeleteJob={deleteJob}/>
  </>
}

export default Jobs
