import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {JobResponse} from 'lib'
import {BrowserRouter} from 'react-router-dom'
import {JobListItem} from './JobListItem'

describe('JobListItem', () => {
  test('job properties rendered', async () => {
    const job: JobResponse = {
      status: 'pending',
      location: 'New York City',
      position: 'Software Engineer',
      contract: 'full-time',
      createdAt: new Date('08/25/2022').toISOString(),
      updatedAt: new Date('08/25/2022').toISOString(),
      company: 'Google',
      id: '12345',
      createdBy: '12345'
    }
    const onDelete = jest.fn()
    render(<JobListItem job={job} onDelete={onDelete}/>, { wrapper: BrowserRouter})
    Object.keys(job).forEach(key => {
      if (key === 'updatedAt' || key === 'createdBy') return
      if (key === 'id') {
        expect(screen.getByRole('link', { name: /edit/i})).toHaveAttribute('href', `/add-job?jobId=12345`)
        return
      }
      if (key === 'createdAt') {
        expect(screen.getByText('Aug 25th, 2022')).toBeInTheDocument()
        return
      }
      const value = job[key as keyof JobResponse] || 'foo'
      expect(screen.getByText(value)).toBeInTheDocument()
    })
    await userEvent.click(screen.getByRole('button', { name: /delete/i}))
    expect(onDelete).toHaveBeenCalledWith(job.id)
  })
})
