import {useAppContext} from 'context/appContext'

const Jobs = () => {
  const { jobs } = useAppContext()
  return <>
    <h1>Jobs Page</h1>
    {jobs?.map(j => (<p key={j.id}>{j.company}</p>))}
  </>
}

export default Jobs
