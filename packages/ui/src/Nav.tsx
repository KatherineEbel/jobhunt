import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Logo } from './Logo'
import { ButtonPrimary } from './styled'

const StyledNav = styled.header`
  align-items: center;
  display: flex;
  height: var(--nav-height);
  width: var(--fluid-width);
  max-width: var(--max-width);

  nav {
    display: flex;
    gap: 1rem;
    margin-left: auto;
  }

  nav a {
    color: var(--grey-300);
    transition: color 300ms ease-in-out;
    &:hover {
      color: var(--primary-700);
    }
  }

  nav a.active {
    color: var(--primary-700);
    font-weight: 600;
  }
`

const ButtonContainer = styled.div`
  margin-left: auto;
`

interface NavProps {
  authenticated: boolean
  onLogout: () => void
}

const pages = [
  { path: '/', label: 'Dashboard' },
  { path: '/landing', label: 'Landing' },
  { path: '/register', label: 'Register' },
]
export const Nav = ({ onLogout, authenticated }: NavProps) => {
  return (
    <StyledNav>
      <Logo />
      <nav>
        {pages.map(({ path, label }) => (
          <NavLink
            key={label.toLowerCase()}
            to={path}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            {label}
          </NavLink>
        ))}
      </nav>
      {authenticated && (
        <ButtonContainer>
          <ButtonPrimary onClick={onLogout}>Log Out</ButtonPrimary>
        </ButtonContainer>
      )}
    </StyledNav>
  )
}
