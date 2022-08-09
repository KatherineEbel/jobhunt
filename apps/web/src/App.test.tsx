import {render, screen} from '@testing-library/react'
import React from 'react'
import App from './App'


const exampleUser = {
  firstName: 'Johnny',
  lastName: 'Smith',
  location: 'New York City',
  email: 'johnny@example.com',
  token: 'foobar',
  createdAt: new Date().toUTCString(),
  updatedAt: new Date().toUTCString(),
}

jest.mock('hooks/useJobs', () => ({
  useJobs: () => ({
    addJob: jest.fn(),
      error: null,
      jobs: [],
      loading: false,
  })
}))

describe('App', function () {
  describe('with user', () => {
    test('stats screen rendered', async () => {
      const value = {
        addJob: jest.fn(),
        jobs: [],
        loading: false,
        loginUser: jest.fn(),
        logout: jest.fn(),
        registerUser: jest.fn(),
        displayAlert: jest.fn(),
        updateUser: jest.fn(),
        alert: null,
        user: exampleUser,
      }


      render(<App initialContext={value}/>)
      expect((await screen.findAllByText(/johnny/i)).length).toBeGreaterThanOrEqual(0)
    })
  })

  describe('without user', () => {
    test('landing screen rendered', async () => {
      const value = {
        addJob: jest.fn(),
        jobs: [],
        loginUser: jest.fn(),
        loading: false,
        logout: jest.fn(),
        registerUser: jest.fn(),
        displayAlert: jest.fn(),
        updateUser: jest.fn(),
        alert: null,
        user: null,
      }

      render(<App initialContext={value}/>)
      expect(screen.getByText(/login \/ register/i)).toBeInTheDocument()
    })
  })
})
