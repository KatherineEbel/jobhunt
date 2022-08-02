import { useAppContext } from 'context/appContext'
import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { Nav, Alert } from 'ui'

const LayoutWrapper = styled.div`
  position: relative;
  padding: 1rem;

  .alert {
    position: absolute;
    top: 100px;
    right: 2rem;
    z-index: 5;
  }
`

export const Layout = () => {
  const { alert } = useAppContext()

  return (
    <LayoutWrapper>
      <Nav />
      {alert && <Alert message={alert.message} type={alert.type} />}
      <Outlet />
    </LayoutWrapper>
  )
}
