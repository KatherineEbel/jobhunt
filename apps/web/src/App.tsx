import {AuthUser} from 'lib'
import {IncomingOptions, Provider as HTTPProvider} from 'use-http'
import {AppContextType, AppProvider} from 'context/appContext'
import { Error, Landing, ProtectedRoute, Register } from 'pages'
import { AddJob, Stats, Jobs, Profile, Dashboard } from 'pages/Dashboard'
import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import useLocalStorageState from 'use-local-storage-state'

interface AppProps {
  initialContext?: AppContextType
}

function App({initialContext}: AppProps) {
  const [user, setUser] = useLocalStorageState<AuthUser | null>('jhUser', {defaultValue: initialContext?.user || null})
  const options: IncomingOptions = {
    interceptors: {
      request: async ({ options}) => {
        if (user && user.token) {
          const headers = options?.headers ? new Headers(options.headers) : new Headers()
          headers.set('Authorization', `Bearer ${user.token}`)
          options.headers = headers
        }
        return options
      },
      response: async ({response}) => {
        if (response.data && response.data.user) {
          console.log('got user response', {data: response.data})
          setUser(response.data.user)
        }
        return response
      }
    }
  }

  return (
    <BrowserRouter>
      <HTTPProvider options={options}>
        <AppProvider value={initialContext}>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={<Stats />} />
              <Route path="add-job" element={<AddJob />} />
              <Route path="jobs" element={<Jobs />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </AppProvider>
      </HTTPProvider>

    </BrowserRouter>
  )
}

export default App
