import React from 'react'
import {render, screen } from '@testing-library/react'
import App from './App'

const exampleUser = {
  firstName: 'Johnny',
  lastName: 'Smith',
  location: 'New York City',
  email: 'johnny@example.com',
  token: 'foobar',
}

describe('App', function () {
  describe('with user', () => {
    test('stats screen rendered', async () => {
      const value = {
        addJob: jest.fn(),
        jobs: [],
        loginUser: jest.fn(),
        logout: jest.fn(),
        registerUser: jest.fn(),
        displayAlert: jest.fn(),
        updateUser: jest.fn(),
        alert: null,
        user: exampleUser,
      }

      render(<App initialContext={value}/>)
      expect(screen.queryByText(/login \/ register/i)).not.toBeInTheDocument()
      expect(screen.queryAllByText(/johnny/i).length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('without user', () => {
    test('stats screen rendered', async () => {
      const value = {
        addJob: jest.fn(),
        jobs: [],
        loginUser: jest.fn(),
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
