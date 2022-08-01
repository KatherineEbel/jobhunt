import * as React from 'react'
import styled from 'styled-components'

const LogoContainer = styled.h1`
  display: flex;
  align-items: center;
  color: var(--white);
  gap: 0.5rem;
  padding: 1rem 2rem;
`
const StyledLogo = styled.span`
  display: grid;
  place-items: center;
  background: var(--primary-500);
  border-radius: 0.8rem;
  font-size: 2.5rem;
  font-weight: 600;
  height: 3rem;
  line-height: 2.5rem;
  width: 3rem;
`

const StyledLogoText = styled.span`
  color: var(--primary-500);
  font-size: 1.6rem;
  font-weight: bold;
  letter-spacing: 2px;
`

export const Logo: React.FC = () => {
  return (
    <>
      <LogoContainer className='logo'>
        <StyledLogo>J</StyledLogo>
        <StyledLogoText>JobHunt</StyledLogoText>
      </LogoContainer>
    </>
  )
}
