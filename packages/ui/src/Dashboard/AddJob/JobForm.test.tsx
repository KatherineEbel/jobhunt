import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {JobForm, JobFormProps} from './JobForm'

describe('JobForm', () => {
  let props: JobFormProps

  beforeEach(() => {
    props = {
      isSuccess: true,
      onSubmit: jest.fn(),
    }
  })

  describe('valid input', () => {
    test('onSubmit called', async () => {
      render(<JobForm {...props}/>)
      const submit = screen.getByRole('button', { name: /submit/i})
      await userEvent.type(screen.getByLabelText(/position/i), 'Software Engineer')
      await userEvent.type(screen.getByLabelText(/company/i), 'Google')
      const location = screen.getByLabelText(/location/i)
      await userEvent.clear(location)
      await userEvent.type(location, 'San Francisco')
      await userEvent.click(submit)
      expect(submit).toBeDisabled()
      await waitFor(() => {
        expect(props.onSubmit).toHaveBeenCalledWith({
          position: 'Software Engineer',
          company: 'Google',
          location: 'San Francisco',
          contract: 'full-time',
          status: 'pending'
        })
      })
    })
  })
})

