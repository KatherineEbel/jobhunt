import React from "react";
import {ReactComponent as NotFound} from 'assets/images/not-found.svg'
import {ErrorPageWrapper, Link} from 'ui'

const Error = () => {
  return (
    <ErrorPageWrapper>
      <NotFound/>
      <h3>Oops!</h3>
      <p>Not what you were looking for?</p>
      <Link to='/'>
        back Home
      </Link>
    </ErrorPageWrapper>
  )
}

export default Error
