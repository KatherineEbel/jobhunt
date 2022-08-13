import {enqueueAlert} from 'features/alert/alertSlice'
import {useAppDispatch} from 'hooks/store'
import {JobQuery} from 'lib'
import {useCallback, useMemo, useState} from 'react'
import {useDeleteJobMutation, useJobsQuery} from 'services/jobHuntApi'
import styled from 'styled-components'
import {ButtonLink, JobList, Loader, Pagination, SearchForm, SearchFormValues} from 'ui'
import { ReactComponent as NoJobs} from 'assets/images/undraw_job_offers.svg'

const Wrapper = styled.section`
  position: relative;
  
  .loader {
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
  }
`

const StyledSVG = styled(NoJobs)`
  float: right;
  max-width: 90%;
`

const Jobs = () => {
  const dispatch = useAppDispatch()
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState<Partial<JobQuery>>({page})
  const {data, error, isFetching} = useJobsQuery({...query, page})
  const [deleteJob, {error: isDeleteError}] = useDeleteJobMutation()

  if (error) {
    dispatch(enqueueAlert({type: 'danger', message: 'Failed to fetch jobs'}))
  }

  if (isDeleteError) {
    dispatch(enqueueAlert({type: 'danger', message: 'Failed to delete job'}))
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
    <SearchForm jobCount={jobData.pageData.total} onSubmit={onSubmit} onReset={clearFilters}/>
    <Loader loading={isFetching}/>
    <Pagination pageData={jobData.pageData} onChangePage={setPage} isFetching={isFetching}/>
    <JobList jobs={jobData.jobs} total={jobData.pageData.total} onDeleteJob={deleteJob}/>
    {jobData.jobs.length === 0 && (
      <>
        <ButtonLink to='/add-job'>Add Application</ButtonLink>
        <StyledSVG/>
      </>
    )}
  </Wrapper>
}

export default Jobs
