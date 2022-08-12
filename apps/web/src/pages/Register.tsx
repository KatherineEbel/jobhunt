import {selectAlerts} from 'features/alert/alertSlice'
import {selectCurrentUser, selectIsMember, toggleRegistered} from 'features/auth/authSlice'
import {useAppDispatch, useTypedSelector} from 'hooks/store'
import { useNavigate } from 'react-router-dom'
import {useLoginMutation, useRegisterMutation} from 'services/jobHuntApi'
import { Alert, RegisterForm, Values } from 'ui'

import styled from 'styled-components'
import { useEffect, useState } from 'react'

const Wrapper = styled.section`
  position: relative;
  display: grid;
  place-items: center;
  width: 100%;
  min-height: 100vh;
  
  .alert {
    position: absolute;
    z-index: 2;
    right: 2rem;
    top: 1rem;
  }

  h3 {
    text-align: center;
  }
`

const Register = () => {
  const isMember = useTypedSelector(selectIsMember)
  const dispatch = useAppDispatch()
  const [reset, setReset] = useState(false)
  const navigate = useNavigate()

  const user = useTypedSelector(selectCurrentUser)
  const [registerUser] = useRegisterMutation()
  const [loginUser] = useLoginMutation()
  const alerts = useTypedSelector(selectAlerts)

  useEffect(() => {
    if (user?.token) {
      navigate('/')
      setReset(true)
      setTimeout(() => setReset(false), 100)
    }
  }, [user, navigate])

  const onSubmit = async (values: Values) => {
    if (!isMember) {
      await registerUser(values)
    } else {
      await loginUser(values)
    }
  }

  const toggleIsMember = () => {
    dispatch(toggleRegistered())
  }

  return (
    <Wrapper>
      <Alert alerts={alerts}/>
      <RegisterForm
        reset={reset}
        onSubmit={onSubmit}
        isMember={isMember}
        toggleIsMember={toggleIsMember}
      />
    </Wrapper>
  )
}

export default Register
