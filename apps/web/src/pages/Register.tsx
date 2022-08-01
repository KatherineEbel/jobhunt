import { RegisterForm } from 'ui'

import styled from 'styled-components'
import {useCallback, useState} from 'react'

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
  const toggleIsMember = useCallback(() => setIsMember(prevState => !prevState), [])
  return (
    <Wrapper>
      <RegisterForm onSubmit={() => console.log('submit!')} isMember={isMember} toggleIsMember={toggleIsMember} />
    </Wrapper>
  )
}

export default Register
