import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {RegisterForm, RegisterFormProps} from 'ui'
// import {BrowserRouter} from 'react-router-dom'

describe('RegisterForm', () => {
  const props: RegisterFormProps = {
    onSubmit: jest.fn(),
    toggleIsMember: jest.fn(),
    isMember: false,
  }
  describe('valid input', () => {
    test('form is submitted with correct values', async () => {
      render(<RegisterForm {...props}/>)
      await userEvent.type(screen.getByLabelText(/name/i), 'John')
      await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com')
      await userEvent.type(screen.getByLabelText(/password/i), 'secret')
      await userEvent.click(screen.getByRole('button', { name: /submit/i}))
      await waitFor(() => expect(props.onSubmit).toHaveBeenCalledWith(
        {
          name: 'John',
          email: 'john@example.com',
          password: 'secret'
        }
      ))
    })
  })

  describe('invalid input', () => {
    describe('when registering', () => {
      test('error messages displayed', async () => {
        render(<RegisterForm {...props}/>)
        await userEvent.click(screen.getByRole('button', { name: /submit/i}))
        await waitFor(() => expect(props.onSubmit).not.toHaveBeenCalled())
        expect(await screen.findByText('Name is required')).toBeVisible()
        expect(await screen.findByText('Email is required')).toBeVisible()
        expect(await screen.findByText('Password is required')).toBeVisible()
      })
    })

    test('invalid email displays error message', async () => {
      render(<RegisterForm {...props}/>)
      await userEvent.type(screen.getByLabelText(/name/i), 'John')
      await userEvent.type(screen.getByLabelText(/email/i), 'johnnyboy')
      await userEvent.type(screen.getByLabelText(/password/i), 'secret')
      await userEvent.click(screen.getByRole('button', { name: /submit/i}))
      await waitFor(() => expect(props.onSubmit).not.toHaveBeenCalled())
      expect(await screen.findByText('Please provide a valid email')).toBeVisible()
    })
  })

  describe('toggle isMember', () => {
    test('when toggle isMember true', async () => {
      render(<RegisterForm {...props}/>)
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
      userEvent.click(screen.getByRole('button', { name: /login/i}))
      await waitFor(() => expect(props.toggleIsMember).toHaveBeenCalled())
    })
  })
})