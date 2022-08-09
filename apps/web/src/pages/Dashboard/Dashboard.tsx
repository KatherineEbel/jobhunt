import {useAppContext} from 'context/appContext'
import { useToggle } from 'hooks/useToggle'
import { Nav } from 'Nav'
import React from 'react'
import {Outlet} from 'react-router-dom'
import { SharedLayout, SmallSidebar, LargeSidebar } from 'ui'
import {Alert, Loader} from 'ui'

const Dashboard = () => {
  const {alert, loading} = useAppContext()
  const { open, toggleOpen } = useToggle()

  if (loading) return <Loader/>

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
