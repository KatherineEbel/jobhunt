import { Error, Landing, ProtectedRoute, Register } from 'pages'
import { AddJob, Stats, Jobs, Profile, Dashboard } from 'pages/Dashboard'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
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
  )
}

export default App
