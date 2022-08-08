import {useAppContext} from 'context/appContext'
import { useToggle } from 'hooks/useToggle'
import { Nav } from 'Nav'
import React from 'react'
import {Outlet} from 'react-router-dom'
import { SharedLayout, SmallSidebar, LargeSidebar } from 'ui'
import {Alert} from 'ui'

const Dashboard = () => {
  const {alert} = useAppContext()
  const { open, toggleOpen } = useToggle()

  return (
    <SharedLayout>
      {alert && <Alert {...alert}/>}
      <main className="dashboard">
        <SmallSidebar onClose={toggleOpen} open={open} />
        <LargeSidebar onClose={toggleOpen} open={open}/>
        <div>
          <Nav toggleSidebar={toggleOpen} />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </SharedLayout>
  )
}

export default Dashboard
