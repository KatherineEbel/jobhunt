import { useAppContext } from 'context/appContext'
import { useNavigate } from 'react-router-dom'
import { RegisterForm, Values } from 'ui'

import styled from 'styled-components'
import { useCallback, useEffect, useState } from 'react'

const Wrapper = styled.section`
  display: grid;
  place-items: center;
  width: 100%;
  min-height: 100vh;

  h3 {
    text-align: center;
  }
`

const Register = () => {
  const [isMember, setIsMember] = useState(false)
  const [reset, setReset] = useState(false)
  const navigate = useNavigate()
  const toggleIsMember = useCallback(
    () => setIsMember((prevState) => !prevState),
    []
  )
  const { registerUser, loginUser, user } = useAppContext()

  useEffect(() => {
    if (user === null) return
    if (user.token) navigate('/')
    setIsMember(true)
    setReset(true)
    setTimeout(() => setReset(false), 100)
  }, [user])

  const onSubmit = async (values: Values) => {
    if (!isMember) {
      await registerUser(values)
    } else {
      console.log(values)
      await loginUser(values)
    }
  }
  return (
    <Wrapper>
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
