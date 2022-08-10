import {ReactElement} from 'react'
import styled from 'styled-components'

interface StatListItemProps {
  title: string
  count: number
  icon: ReactElement
  color: string
  bgc: string
}

const Wrapper = styled.article<Pick<StatListItemProps, 'color' | 'bgc'>>`
  padding: 2rem;
  background: var(--white);
  border-radius: var(--borderRadius);
  border-bottom: 5px solid ${(props) => props.color};

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .count {
    display: block;
    font-weight: 700;
    font-size: 50px;
    color: ${(props) => props.color};
  }

  .title {
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: left;
    margin: 0.5rem 0 0;
  }

  .icon {
    width: 70px;
    height: 60px;
    background: ${(props) => props.bgc};
    border-radius: var(--borderRadius);
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      font-size: 2rem;
      color: ${(props) => props.color};
    }
  }
`

export const StatListItem = ({color, bgc, title, icon, count}: StatListItemProps) => {
  return (
    <Wrapper bgc={bgc} color={color}>
      <header>
        <p className='count'>{count}</p>
        <div className='icon'>{icon}</div>
      </header>
      <h3 className='title'>{title}</h3>
    </Wrapper>
  )
}
