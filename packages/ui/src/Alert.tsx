import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import { Alert as JHAlert } from 'lib'


const StyledAlert = styled.p<{show: boolean}>`
  border-radius: var(--borderRadius);
  overflow: hidden;
  padding: 0.6rem 1.5rem;
  transition: transform 300ms ease-in-out;
  transform: scaleY(${({show}) => show ? 1 : 0});
`

const AlertDanger = styled(StyledAlert)`
  background: var(--red-light);
  color: var(--red-dark);
`

const AlertSuccess = styled(StyledAlert)`
  background: var(--green-light);
  color: var(--green-dark);
`
interface AlertProps {
  alerts: JHAlert[]
  onDequeueAlert: () => void
}

export const Alert = ({alerts, onDequeueAlert}: AlertProps) => {
  const [alert, setAlert] = useState<JHAlert | null>()
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (alerts.length > 0) {
      setAlert(alerts.at(-1))
      setShow(true)
      setTimeout(() => {
        setShow(false)
        onDequeueAlert()
      }, 5000)
    }
  }, [alerts, onDequeueAlert])

  if (!alert) return null

  const Component = alert.type === 'success' ? AlertSuccess : AlertDanger

  return <Component show={show} data-test-id='alert' className='alert'>{alert.message}</Component>
}