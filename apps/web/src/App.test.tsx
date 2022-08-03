import { AppContextType, AppProvider } from 'context/appContext'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render as customRender, screen } from './testUtils'
import { render } from '@testing-library/react'
import App from './App'

const value: AppContextType = {
  loginUser: jest.fn(),
  logout: jest.fn(),
  registerUser: jest.fn(),
  displayAlert: jest.fn(),
  alert: null,
  user: null,
}

test('renders correct heading', () => {
  value.user = {
    name: 'Johnny Smith',
    email: 'johnny@example.com',
    token: 'foobar',
  }
  customRender(<App />, { value })
  const heading = screen.getByText(/jobhunt/i)
  expect(heading).toBeInTheDocument()
  expect(screen.getByText(/johnny smith/i)).toBeInTheDocument()
})

test('directed to register when no user', () => {
  value.user = null
  render(
    <MemoryRouter initialEntries={['/']}>
      <AppProvider value={value}>
        <App />
      </AppProvider>
    </MemoryRouter>
  )

  expect(screen.getByRole('heading', { name: /register/i })).toBeInTheDocument()
})

test('directed to not found page if bad route', () => {
  render(
    <MemoryRouter initialEntries={['/does/not-exist']}>
      <AppProvider value={value}>
        <App />
      </AppProvider>
    </MemoryRouter>
  )
  expect(screen.getByRole('link', { name: /back home/i })).toBeInTheDocument()
})
