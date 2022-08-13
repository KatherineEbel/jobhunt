import {dequeueAlert, selectAlerts} from 'features/alert/alertSlice'
import {useAppDispatch, useTypedSelector} from 'hooks/store'
import { useToggle } from 'hooks/useToggle'
import { Nav } from 'Nav'
import React, {useCallback} from 'react'
import {Outlet} from 'react-router-dom'
import { Alert, SharedLayout, SmallSidebar, LargeSidebar } from 'ui'

const Dashboard = () => {
  const { open, toggleOpen } = useToggle()
  const alerts = useTypedSelector(selectAlerts)
  const dispatch = useAppDispatch()

  const handleDequeueAlert = useCallback(() => {
    dispatch(dequeueAlert())
  }, [dispatch])

  return (
    <SharedLayout>
      <Alert alerts={alerts} onDequeueAlert={handleDequeueAlert}/>
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
