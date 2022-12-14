import {JobListItem} from 'Dashboard/AllJobs/JobListItem'
import {JobResponse} from 'lib'
import styled from 'styled-components'

const Wrapper = styled.section`
  margin-top: 2rem;

  h2 {
    margin-top: 1rem;
    text-transform: none;
  }

  & > h5,
  & > h2 {
    margin-bottom: 1rem;
  }

  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    margin: .5rem 0;
    row-gap: 2rem;
  }

  @media (min-width: 992px) {
    .jobs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }`

export interface JobListProps {
  onDeleteJob: (jobId: string) => void
  jobs: JobResponse[]
  total: number
}

export const JobList = ({onDeleteJob, jobs, total}: JobListProps) => {
  return (
    <Wrapper>
      <h5>{total} application{(total === 0 || total > 1) && 's'} found</h5>
      {jobs && jobs.length ? (
        <div className='jobs'>
          {jobs.map((job: JobResponse) => (<JobListItem key={job.id} job={job} onDelete={onDeleteJob}/>))}
        </div>
      ) : (<h2>No applications to display</h2>)}
    </Wrapper>
  )
}
