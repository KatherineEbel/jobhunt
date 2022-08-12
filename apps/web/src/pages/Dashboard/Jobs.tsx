import {createAlert} from 'features/alert/alertSlice'
import {useAppDispatch} from 'hooks/store'
import {JobQuery} from 'lib'
import {useCallback, useMemo, useState} from 'react'
import {useDeleteJobMutation, useJobsQuery} from 'services/jobHuntApi'
import styled from 'styled-components'
import {JobList, Loader, Pagination, SearchForm, SearchFormValues} from 'ui'

const Wrapper = styled.section`
  position: relative;
  
  .loader {
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
  }
`

const Jobs = () => {
  const dispatch = useAppDispatch()
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState<Partial<JobQuery>>({page})
  const {data, error, isFetching} = useJobsQuery({...query, page})
  const [deleteJob, {isError}] = useDeleteJobMutation()

  if (error) {
    dispatch(createAlert({type: 'danger', message: 'Failed to fetch jobs'}))
  }

  if (isError) {
    dispatch(createAlert({type: 'danger', message: 'Failed to delete job'}))
  }

  const onSubmit = useCallback((values: SearchFormValues) => {
    const {status, contract} = values
    setPage(1)
    setQuery(prevState => ({
      ...prevState,
      ...values,
      status: status === 'all' ? undefined : status,
      contract: contract === 'all' ? undefined : contract
    }))
  }, [])

  const jobData = useMemo(() => {
    if (!data) return null
    const {data: jobs, ...pageData} = data
    return {jobs, pageData}
  }, [data])


  const clearFilters = useCallback(() => {
    setQuery({page: 1})
    setPage(1)
  }, [])

  if (jobData === null) return null

  return <Wrapper>
    <SearchForm onSubmit={onSubmit} onReset={clearFilters}/>
    <Loader loading={isFetching}/>
    <Pagination pageData={jobData.pageData} onChangePage={setPage} isFetching={isFetching}/>
    <JobList jobs={jobData.jobs} total={jobData.pageData.total} onDeleteJob={deleteJob}/>
  </Wrapper>
}

export default Jobs
