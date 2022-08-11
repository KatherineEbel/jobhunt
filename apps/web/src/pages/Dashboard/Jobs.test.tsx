import {waitForElementToBeRemoved} from '@testing-library/react'
import {Jobs} from 'pages/Dashboard/index'
import {renderWithProviders, screen} from 'testUtils'

describe('Jobs Page', () => {
  test('renders jobs', async () => {
    renderWithProviders(<Jobs/>)
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'))
    expect(await screen.findByRole('heading', {name: /20 jobs found/i})).toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(20)
  })
})