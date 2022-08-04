import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {ProfileForm, ProfileFormProps} from './ProfileForm'

describe('ProfileForm', () => {
  let props: ProfileFormProps

  beforeEach(() => {
    props = {
    onSubmit: jest.fn(),
    user: undefined,
  }
  })

  test('user field filled in when user provided', () => {
    props.user = {firstName: 'John', lastName: 'Smith', email: 'john@example.com'}
    render(<ProfileForm {...props}/>)
    expect(screen.getByLabelText(/first name/i)).toHaveValue('John')
    expect(screen.getByLabelText(/last name/i)).toHaveValue('Smith')
    expect(screen.getByLabelText(/email/i)).toHaveValue('john@example.com')
  })

  test('form submitted with correct values', async () => {
    render(<ProfileForm {...props}/>)
    const submit = screen.getByRole('button', { name: /save changes/i})
    await userEvent.type(screen.getByLabelText(/first name/i), 'Johnny')
    await userEvent.type(screen.getByLabelText(/last name/i), 'Appleseed')
    await userEvent.type(screen.getByLabelText(/email/i), 'johnny@apple.com')
    await userEvent.click(submit)
    expect(submit).toBeDisabled()
    await waitFor(() =>
      expect(props.onSubmit).toHaveBeenCalledWith({
        firstName: 'Johnny',
        lastName: 'Appleseed',
        email: 'johnny@apple.com',
      })
    )
  })

})