import React from 'react'
import {Link} from 'react-router-dom'
import { Logo } from "./Logo"
import styled from 'styled-components'

const StyledNav = styled.header`
  align-items: center;
  display: flex;
  height: var(--nav-height);
  width: var(--fluid-width);
  max-width: var(--max-width);
`



export const Nav = () => {
  return (
    <StyledNav>
      <Logo/>
      <nav>
        <Link to='/'>Dashboard</Link>
        <Link to='/landing'>Landing</Link>
        <Link to='/register'>Register</Link>
      </nav>
    </StyledNav>
  )
}
