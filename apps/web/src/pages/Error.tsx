import { ReactComponent as NotFound } from 'assets/images/not-found.svg'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ErrorPageWrapper } from 'ui'

const StyledLink = styled(Link)`
  color: var(--primary-600);
  font-weight: 700;
  text-decoration: none;
`

const Error = () => {
  return (
    <ErrorPageWrapper>
      <NotFound />
      <h3>Oops!</h3>
      <p>Not what you were looking for?</p>
      <StyledLink to="/">back Home</StyledLink>
    </ErrorPageWrapper>
  )
}

export default Error
