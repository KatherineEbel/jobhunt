import styled from 'styled-components'

export const Wrapper = styled.div`
  display: grid;
  min-height: 100vh;
  place-items: center;
  padding: 2rem;

  .page {
    align-items: center;
    display: grid;
    height: 100%;
  }
  
  .info {
    margin-top: 5rem;
  }

  .info p {
    color: var(--grey-600);
  }

  svg {
    float: right;
    margin-top: -5rem;
  }
  
  @media (min-width: 992px) {
    svg {
      margin-top: 0;
    }
    
    .info {
      margin-top: -20rem;
    }
    
    .page {
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 3rem;
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

