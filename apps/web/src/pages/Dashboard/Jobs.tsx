import {JobList, SearchForm, SearchFormValues} from 'ui'
import {useAppContext} from 'context/appContext'

const Jobs = () => {
  const { deleteJob, jobs } = useAppContext()

  const onSubmit = (values: SearchFormValues) => {
    console.log(values)
  }
  return <>
    <SearchForm onSubmit={onSubmit}/>
    <JobList jobs={jobs}  onDeleteJob={deleteJob}/>
  </>
}

export default Jobs
