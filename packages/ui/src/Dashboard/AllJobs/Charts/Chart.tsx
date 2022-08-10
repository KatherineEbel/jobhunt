import { useState} from 'react'
import {Button} from 'styled'
import styled from 'styled-components'
import {AreaChart, BarChart, ChartProps} from './index'


const Wrapper = styled.section`
  margin-top: 4rem;
  text-align: center;
  button {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    color: var(--primary-500);
    font-size: 1.25rem;
    cursor: pointer;
  }
  h4 {
    text-align: center;
    margin-bottom: 0.75rem;
  }
`

export const Chart = ({totals}: ChartProps) => {
  const [viewBarChart, setViewBarChart] = useState(true)
  return (
    <Wrapper>
      <h1>Monthly Applications</h1>
      <Button onClick={() => setViewBarChart(prev => !prev)}>
        View {viewBarChart ? 'Area Chart' : 'Bar Chart'}
      </Button>
      {viewBarChart ? <BarChart totals={totals}/> : <AreaChart totals={totals}/>}
    </Wrapper>
  )
}