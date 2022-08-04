import { AppContextType } from 'context/appContext'
import React from 'react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import App from './App'

const exampleUser = {
  firstName: 'Johnny',
  lastName: 'Smith',
  email: 'johnny@example.com',
  token: 'foobar',
}

describe('App', function () {
  let value: AppContextType
  beforeEach(() => {
    value = {
      authenticate: jest.fn(),
      loginUser: jest.fn(),
      logout: jest.fn(),
      registerUser: jest.fn(),
      displayAlert: jest.fn(),
      updateUser: jest.fn(),
      alert: null,
      user: null,
    }
  })

  test('render without user', async () => {
    (value.authenticate as jest.MockedFunction<() => Promise<boolean>>).mockReturnValueOnce(Promise.resolve(false))
    const { asFragment} = render(<App/>)
    await waitForElementToBeRemoved(() => screen.queryByTestId('loader'))
    expect(await asFragment()).toMatchSnapshot()
  })

  test('render with user', async () => {
    (value.authenticate as jest.MockedFunction<() => Promise<boolean>>).mockReturnValueOnce(Promise.resolve(true))
    value.user = {
      firstName: 'Johnny',
      lastName: 'Smith',
      email: 'johnny@example.com',
      token: 'foobar',
    }
    const { asFragment} = render(<App/>)
    await waitForElementToBeRemoved(() => screen.queryByTestId('loader'))
    expect(await asFragment()).toMatchSnapshot()
  })

  test('render lands on stats page and renders user name', async () => {
    value.user = exampleUser

    ;(value.authenticate as jest.MockedFunction<() => Promise<boolean>>).mockReturnValueOnce(Promise.resolve(true))
    render(<App initialContext={value}/>)
    expect(await screen.findByRole('heading', {name: /stats/i})).toBeInTheDocument()
    expect(await screen.findByText(/johnny/i)).toBeInTheDocument()
  })
})
