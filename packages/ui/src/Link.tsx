import * as React from 'react'
import {LinkProps, useHref, useLinkClickHandler} from 'react-router-dom'
import styled from 'styled-components'
import { ButtonLink} from './styled'


const StyledLink = styled(ButtonLink)`
  color: var(--white);
`

export const Link: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>> = React.forwardRef(
  (
    {
      onClick,
      replace = false,
      state,
      target,
      to,
      ...rest
    }: LinkProps,
    ref
  ) => {
    const href = useHref(to);
    const handleClick = useLinkClickHandler(to, {
      replace,
      state,
      target,
    });

    return (
      <StyledLink>
        <a
          {...rest}
          href={href}
          onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            onClick?.(event);
            if (!event.defaultPrevented) {
              handleClick(event);
            }
          }}
          ref={ref}
          target={target}
        />
      </StyledLink>
    )
  }
)

Link.displayName = 'Link'