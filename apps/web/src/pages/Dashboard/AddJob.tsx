import {useAppContext} from 'context/appContext'
import {CreateJobRequest} from 'lib'
import { JobForm} from 'ui'

const AddJob = () => {
  const { addJob } = useAppContext()
  const handleSubmit = async (values: CreateJobRequest) => {
    console.log(values)
    const result = await addJob(values)
    return !result
  }
  return <>
    <h1>Add Job</h1>
    <JobForm onSubmit={handleSubmit} />
  </>
}

export default AddJob
