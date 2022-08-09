import {JobList, SearchForm, SearchFormValues} from 'ui'
import {useAppContext} from 'context/appContext'

const Jobs = () => {
  const onSubmit = (values: SearchFormValues) => {
    console.log(values)
  }

  const { jobs } = useAppContext()
  return <>
    <SearchForm onSubmit={onSubmit}/>
    <JobList jobs={jobs}/>
  </>
}

export default Jobs
