import {Link} from 'react-router-dom'
import styled, {css} from 'styled-components'

export const button = css`
  cursor: pointer;
  color: var(--white);
  background: var(--primary-500);
  border: transparent;
  border-radius: var(--borderRadius);
  letter-spacing: var(--letterSpacing);
  padding: 0.375rem 0.75rem;
  box-shadow: var(--shadow-2);
  transition: var(--transition);
  text-transform: capitalize;
  display: inline-block;

  &:hover {
    background: var(--primary-700);
    box-shadow: var(--shadow-3);
  }
`

export const Button = styled.button`
  ${button}
`

export const ButtonPrimary = styled(Button)`
  color: var(--primary-500);
  background: var(--primary-200);

  &:hover {
    color: var(--primary-200);
    background: var(--primary-700);
  }
`

export const ButtonBlock = styled(Button)`
  width: 100%;
`


export const hero = css`
  font-size: 1.25rem;
  padding: 0.5rem 1.25rem;
`
export const ButtonHero = styled(Button)`
  ${hero}
`

export const ButtonLink = styled(Link)`
  ${button}
  ${hero}
`

export const ButtonDanger = styled(Button)`
  background: var(--red-light);
  color: var(--red-dark);

  &:hover {
    background: var(--red-dark);
    color: var(--white);
  }
`