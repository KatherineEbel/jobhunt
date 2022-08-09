import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

export const button = css`
  background: var(--primary-500);
  border: transparent;
  border-radius: var(--borderRadius);
  box-shadow: var(--shadow-2);
  cursor: pointer;
  color: var(--white);
  display: inline-block;
  font-weight: 600;
  letter-spacing: var(--letterSpacing);
  padding: 0.7rem 1rem;
  transition: var(--transition);
  text-transform: capitalize;

  &:hover {
    background: var(--primary-700);
    box-shadow: var(--shadow-3);
    color: var(--white)
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
`
export const ButtonHero = styled(Button)`
  ${hero}
`

export const ButtonLink = styled(Link)`
  ${button}
`

export const ButtonDanger = styled(Button)`
  background: var(--red-light);
  color: var(--red-dark);

  &:hover {
    background: var(--red-dark);
    color: var(--white);
  }
`
