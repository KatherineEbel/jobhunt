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
  const navigate = useNavigate()
  const toggleIsMember = useCallback(
    () => setIsMember((prevState) => !prevState),
    []
  )
  const { registerUser, loading, user } = useAppContext()

  useEffect(() => {
    if (user === null) return
    if (user.token) navigate('/')
    setIsMember(true)
  }, [user])

  const onSubmit = async (values: Values) => {
    if (!isMember) {
      await registerUser(values)
    }
  }
  return (
    <Wrapper>
      <RegisterForm
        reset={user !== null}
        onSubmit={onSubmit}
        isMember={isMember}
        submitting={loading}
        toggleIsMember={toggleIsMember}
      />
    </Wrapper>
  )
}

export default Register
