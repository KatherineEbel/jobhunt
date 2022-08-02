import React from 'react'
import styled from 'styled-components'

interface AlertProps {
  message: string
  type: 'danger' | 'success'
}

const StyledAlert = styled.p`
  border-radius: var(--borderRadius);
  padding: 0.6rem 1.5rem;
`

const AlertDanger = styled(StyledAlert)`
  background: var(--red-light);
  color: var(--red-dark);
`

const AlertSuccess = styled(StyledAlert)`
  background: var(--green-light);
  color: var(--green-dark);
`

export const Alert = ({ message, type }: AlertProps) => {
  const Component = type === 'success' ? AlertSuccess : AlertDanger
  return <Component className="alert">{message}</Component>
}
