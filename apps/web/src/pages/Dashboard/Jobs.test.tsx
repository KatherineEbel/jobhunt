import userEvent from '@testing-library/user-event'
import {setupStore} from 'app/store'
import {setCredentials} from 'features/auth/authSlice'
import {Jobs} from 'pages/Dashboard/index'
import {authUser} from 'setupTests'
import {renderWithProviders, screen} from 'testUtils'

describe('Jobs Page', () => {
  test('renders jobs using pagination', async () => {
    const store = setupStore()
    store.dispatch(setCredentials({ user: authUser}))
    renderWithProviders(<Jobs/>, { store })
    expect(await screen.findByRole('heading', {name: /20 jobs found/i})).toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(6)
    expect(await screen.findByTestId('pagination')).toBeInTheDocument()
    userEvent.click(screen.getByTestId('last-btn'))
    const btn = await screen.findByRole('button', { name: /4/})
    expect(btn).toBeInTheDocument()
    userEvent.click(screen.getByTestId('first-btn'))
    expect(btn).not.toBeInTheDocument()
  })
})