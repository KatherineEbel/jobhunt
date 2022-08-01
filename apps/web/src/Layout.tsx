import React from 'react'
import {Outlet} from 'react-router-dom'
import {Nav} from 'ui'

export const Layout = () => {
  return (
    <div>
      <Nav/>
      <Outlet/>
    </div>
  )
}