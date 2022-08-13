import styled from 'styled-components'
import {ButtonLink, Wrapper, StyledHeading } from 'ui'
import { ReactComponent as Hero } from 'assets/images/undraw_interview.svg'

const StyledHero = styled(Hero)`
  width: 600px;
  max-width: 90%;
`

const Landing = () => {
  return (
    <Wrapper>
      <main className='container page'>
        <section className='info'>
          <StyledHeading>
            job <span>tracking</span> app
          </StyledHeading>
          <p>Stay on top of your progress while seeking your dream job.</p>
          <ButtonLink to='/register'>
            Login / Register
          </ButtonLink>
        </section>
        <div className='hero-wrapper'>
          <StyledHero/>
        </div>
      </main>
    </Wrapper>
  )
}

export default Landing