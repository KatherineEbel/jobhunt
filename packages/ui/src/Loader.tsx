import {FaSpinner} from 'react-icons/fa'
import styled, {keyframes} from 'styled-components'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }`

const Rotate = styled(FaSpinner)`
  fill: currentColor;
  animation: ${rotate} 3s linear infinite;
`

const Wrapper = styled.div<{ size: number }>`
  display: grid;
  place-items: center;
  font-size: ${({size}) => size}px;
  padding-top: 5rem;
  color: var(--primary-600);
}

`
export const Loader = () => {
  return (
    <Wrapper size={50}>
      <Rotate/>
    </Wrapper>
  )
}