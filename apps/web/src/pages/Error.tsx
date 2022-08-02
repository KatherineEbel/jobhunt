import React from 'react'
import { ReactComponent as NotFound } from 'assets/images/not-found.svg'
import { ErrorPageWrapper, ButtonLink } from 'ui'

const Error = () => {
  return (
    <ErrorPageWrapper>
      <NotFound />
      <h3>Oops!</h3>
      <p>Not what you were looking for?</p>
      <ButtonLink to="/">back Home</ButtonLink>
    </ErrorPageWrapper>
  )
}

export default Error
