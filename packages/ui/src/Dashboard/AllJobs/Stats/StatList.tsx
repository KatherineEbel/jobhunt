import {StatListItem} from 'Dashboard/AllJobs/Stats/StatListItem'
import { FaSuitcaseRolling, FaCalendarCheck, FaBug, FaLaptopCode} from 'react-icons/fa'
import {ApplicationStats} from 'lib'
import styled from 'styled-components'

const Wrapper = styled.section`
  display: grid;
  row-gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 1rem;
  }
  @media (min-width: 1120px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

interface StatListProps {
  stats?: ApplicationStats
}

export const StatList = ({stats}: StatListProps) => {
  if (!stats) return null
  const defaultStats = [
    {
      title: 'pending applications',
      count: stats.pending || 0,
      icon: <FaSuitcaseRolling/>,
      color: '#e9b949',
      bgc: '#fcefc7',
    },
    {
      title: 'interviews scheduled',
      count: stats.interview || 0,
      icon: <FaCalendarCheck/>,
      color: '#647acb',
      bgc: '#e0e8f9',
    },
    {
      title: 'jobs declined',
      count: stats.declined || 0,
      icon: <FaBug/>,
      color: '#d66a6a',
      bgc: '#ffeeee',
    },
    {
      title: 'offers received',
      count: stats.offer || 0,
      icon: <FaLaptopCode/>,
      color: '#2fbb2f',
      bgc: 'rgba(47,187,47,0.2)',
    }
  ]
  return (
    <Wrapper>
      {defaultStats.map(item => (<StatListItem key={item.title.split(' ').join('-') + `-${item.count}`} {...item} />))}
    </Wrapper>
  )
}

