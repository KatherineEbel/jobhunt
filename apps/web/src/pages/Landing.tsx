import main from 'assets/images/main.svg'
import {ButtonLink, Wrapper, StyledHeading } from 'ui'

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
          <img className='hero-img' src={main} alt=''/>
        </div>
      </main>
    </Wrapper>
  )
}

export default Landing