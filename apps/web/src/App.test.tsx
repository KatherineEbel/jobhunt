import {screen} from '@testing-library/react'
import {setupStore} from 'app/store'
import {setCredentials} from 'features/auth/authSlice'
import React from 'react'
import {renderWithProviders} from 'testUtils'
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

describe('App', function () {
  describe('with user', () => {
    test('stats screen rendered', async () => {
      const store = setupStore()
      store.dispatch(setCredentials({user: exampleUser}))
      renderWithProviders(<App/>, { store })
      expect((await screen.findAllByText(/johnny/i)).length).toBeGreaterThanOrEqual(0)
    })
  })

  describe('without user', () => {
    test('landing screen rendered', async () => {
      renderWithProviders(<App/>)
      expect(screen.getByText(/login \/ register/i)).toBeInTheDocument()
    })
  })
})
