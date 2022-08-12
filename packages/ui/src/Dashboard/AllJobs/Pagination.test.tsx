import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Pagination} from './Pagination'

describe('Pagination', () => {
  test('render', async () => {
    const onChange = jest.fn()
    const pageData = {
      totalPages: 6,
      perPage: 6,
      total: 36,
      page: 1,
    }

    onChange.mockImplementation(page => pageData.page = page)

    render(<Pagination pageData={pageData} onChangePage={onChange} isFetching={false}/>)
    const first = screen.getByTestId('first-btn')
    const last = screen.getByTestId('last-btn')
    expect(screen.getAllByRole('button', { name: /\d/})).toHaveLength(3)
    expect(first).toBeDisabled()
    expect(last).not.toBeDisabled()
    await userEvent.click(last)
    expect(onChange).toHaveBeenCalledWith(6)
    await userEvent.click(first)
    expect(onChange).toHaveBeenCalledTimes(1)
    await userEvent.click(screen.getByText(/2/))
    expect(onChange).toHaveBeenCalledWith(2)
  })
})