import { AppContextType, AppProvider } from 'context/appContext'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render as customRender, screen } from './testUtils'
import { render } from '@testing-library/react'
import App from './App'

const value: AppContextType = {
  authenticate: jest.fn(),
  loginUser: jest.fn(),
  logout: jest.fn(),
  registerUser: jest.fn(),
  displayAlert: jest.fn(),
  updateUser: jest.fn(),
  alert: null,
  user: null,
}

test('renders correct heading', async () => {
  (value.authenticate as jest.MockedFunction<() => Promise<boolean>>).mockReturnValueOnce(Promise.resolve(true))
  value.user = {
    name: 'Johnny Smith',
    email: 'johnny@example.com',
    token: 'foobar',
  }
  customRender(<App />, { value })
  expect(await screen.findByText(/johnny smith/i)).toBeInTheDocument()
})

test('directed to landing when no user', async () => {
  (value.authenticate as jest.MockedFunction<() => Promise<boolean>>).mockReturnValueOnce(Promise.resolve(false))
  value.user = null
  render(
    <MemoryRouter initialEntries={['/']}>
      <AppProvider value={value}>
        <App />
      </AppProvider>
    </MemoryRouter>
  )

  expect(await screen.findByRole('heading', { name: /job tracking app/i })).toBeInTheDocument()
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
