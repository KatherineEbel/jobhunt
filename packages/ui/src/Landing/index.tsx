import styled from 'styled-components'

export const Wrapper = styled.div`
  display: grid;
  min-height: 100vh;
  place-items: center;
  grid-template-rows: var(--nav-height) 1fr;
  padding: 2rem;

  .page {
    align-items: center;
    display: grid;
  }

  .info p {
    color: var(--grey-600);
  }

  .hero-img {
    display: none;
  }

  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 3rem;
    }
    
    .hero-img {
      display: block;
    }
  }
`

export const StyledHeading = styled.h1`
  font-weight: 700;
  text-transform: capitalize;

  span {
    color: var(--primary-400);
  }
`

