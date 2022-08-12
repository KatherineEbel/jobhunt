import {FaBriefcase, FaCalendarAlt, FaLocationArrow} from 'Dashboard/Icons'
import {formatDateString, JobResponse} from 'lib'
import {ReactElement, useCallback} from 'react'
import styled from 'styled-components'
import {Button, ButtonLink} from 'styled'

const EditButton = styled(ButtonLink)`
  background: var(--primary-200);
  color: var(--primary-800);
  letter-spacing: var(--letterSpacing);
`

const DeleteButton = styled(Button)`
  background: var(--red-light);
  color: var(--red-dark);

  &:hover {
    background: var(--red-dark);
  }
`

const Wrapper = styled.article`
  background: var(--white);
  border-radius: var(--borderRadius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);

  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    h5 {
      letter-spacing: 0;
    }
  }
  .main-icon {
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    background: var(--primary-500);
    border-radius: var(--borderRadius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 2rem;
  }
  .info {
    h5 {
      margin-bottom: 0.25rem;
    }
    p {
      margin: 0;
      text-transform: capitalize;
      color: var(--grey-400);
      letter-spacing: var(--letterSpacing);
    }
  }
  .accepted {
    background: var(--green-light);
    color: var(--green-dark)
  }
  
  .pending {
    background: #fcefc7;
    color: #e9b949;
  }
  .interview {
    background: #e0e8f9;
    color: #647acb;
  }
  .declined {
    color: #d66a6a;
    background: #ffeeee;
  }
  .content {
    padding: 1rem 1.5rem;
  }
  .content-center {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 992px) {
      grid-template-columns: 1fr;
    }
    @media (min-width: 1120px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .status {
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    width: 100px;
    height: 30px;
  }
  footer {
    margin-top: 1rem;
  }
  
  .actions {
    display: flex;
    gap: 1rem;
  }
  
  &:hover .actions {
    visibility: visible;
  }
`

const JobDetailWrapper = styled.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  
  svg {
    color: var(--grey-300);
  }

  .icon {
    font-size: 1rem;
    margin-right: 0.5rem;
    display: flex;
    align-items: center;
  }
  
  .text {
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
  }`

const JobDetail = ({icon, text}: {icon: ReactElement, text: string}) => {
  return (
    <JobDetailWrapper>
      <div className='icon'>
        {icon}
      </div>
      <p className='text'>
        {text}
      </p>
    </JobDetailWrapper>
  )
}

export interface JobListItemProps {
  onDelete: (jobId: string) => void
  job: JobResponse
}

export const JobListItem = ({ onDelete, job}: JobListItemProps) => {
  const { company, createdAt, id, position, location, contract, status } = job
  if (!id) throw new Error('job id required')

  const handleDelete = useCallback((jobId: string) => {
    onDelete(jobId)
  }, [onDelete])

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{company.charAt(0)}</div>
        <div className='info'>
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className='content'>
        {/*<h5>{}</h5>*/}
        <div className='content-center'>
          <JobDetail icon={<FaLocationArrow/>} text={location}/>
          <JobDetail icon={<FaCalendarAlt/>} text={formatDateString(createdAt)}/>
          <JobDetail icon={<FaBriefcase/>} text={contract}/>
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className='actions'>
            <EditButton to={`/add-job?jobId=${id}`}>Edit</EditButton>
            <DeleteButton onClick={() => handleDelete(id)}>Delete</DeleteButton>
          </div>
        </footer>
      </div>
    </Wrapper>
  )
}