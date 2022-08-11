import {waitForElementToBeRemoved} from '@testing-library/react'
import {setupStore} from 'app/store'
import {setCredentials} from 'features/auth/authSlice'
import {Stats} from 'pages/Dashboard/index'
import {PropsWithChildren} from 'react'
import {renderWithProviders, screen} from 'testUtils'

const user = {
  firstName: 'Johnny',
  lastName: 'Smith',
  location: 'New York City',
  email: 'johnny@example.com',
  token: '62e9b9de742aed9193d4e23f',
  createdAt: new Date().toUTCString(),
  updatedAt: new Date().toUTCString(),
}

jest.mock('recharts', () => {
  const OriginalModule = jest.requireActual('recharts')
  return {
    ...OriginalModule,
    ResponsiveContainer: ({children}: PropsWithChildren) => (
      <OriginalModule.ResponsiveContainer width={800} height={800}>
        {children}
      </OriginalModule.ResponsiveContainer>
    )
  }
})

describe('Stats Page', function () {
  beforeEach(() => {
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  })
  test('render', async () => {
    const store = setupStore()
    store.dispatch(setCredentials({user}))
    const {asFragment} = renderWithProviders(<Stats/>, { store })
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'))
    expect(screen.getByText(/20/)).toBeInTheDocument()
    expect(screen.getByText(/15/)).toBeInTheDocument()
    expect(screen.getByText(/22/)).toBeInTheDocument()
    expect(screen.getByText(/20/)).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })
})