import {Form, Formik, FormikHelpers, useFormikContext} from 'formik'
import {Input} from 'Input'
import {Logo} from 'Logo'
import * as React from 'react'
import {ButtonBlock} from 'styled'
import styled from 'styled-components'
import * as yup from 'yup'

const SignInButton = styled(ButtonBlock)`
  padding: 0.7rem 0;
`

const MemberButton = styled.button`
  text-decoration: none;
  background: transparent;
  border: transparent;
  color: var(--primary-500);
  cursor: pointer;
  letter-spacing: var(--letterSpacing);
`

const Wrapper = styled(Form)`
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: var(--borderRadius);
  border-top: 5px solid var(--primary-500);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 1rem;
  max-width: 90vw;
  width: 400px;
`

export interface Values {
  firstName: string
  lastName: string
  location: string
  email: string
  password: string
}

export interface RegisterFormProps {
  isMember: boolean
  reset: boolean
  toggleIsMember: () => void
  onSubmit: (values: Values) => void
}

const ClearForm = ({success}: {success: boolean}) => {
  const {resetForm} = useFormikContext()
  
  if (success) resetForm()
  return <></>
}

export const RegisterForm = ({
                               isMember = false,
                               onSubmit,
                               reset,
                               toggleIsMember,
                             }: RegisterFormProps) => {
  const handleSubmit = async (
    values: Values,
    {setSubmitting}: FormikHelpers<Values>
  ) => {
    setSubmitting(true)
    onSubmit(values)
  }

  return (
    <Formik
      initialValues={{firstName: '', lastName: '', location: '', email: '', password: ''}}
      validationSchema={yup.object({
        isMember: yup.boolean().default(isMember),
        firstName: yup.string().when('isMember', {
          is: false,
          then: yup.string().required('first name is required'),
        }),
        lastName: yup.string().when('isMember', {
          is: false,
          then: yup.string().required('last name is required'),
        }),
        location: yup.string().when('isMember', {
          is: false,
          then: yup.string().required('location is required')
        }),
        email: yup.string()
          .email('Please provide a valid email')
          .required('Email is required'),
        password: yup.string().when('isMember', {
          is: false,
          then: yup.string().required('Password is required'),
        }),
      })}
      onSubmit={handleSubmit}
    >
      {({isSubmitting}) => (
        <Wrapper>
          <ClearForm success={reset}/>
          <Logo/>
          <h3>{isMember ? 'Login' : 'register'}</h3>
          {!isMember && (
            <>
              <Input label='First Name' type='text' name='firstName'/>
              <Input label='Last Name' type='text' name='lastName'/>
              <Input label='Location' type='text' name='location'/>
            </>
          )}
          <Input label='Email' type='text' name='email'/>
          <Input label='Password' type='password' name='password'/>
          <SignInButton type='submit' disabled={isSubmitting}>
            Submit
          </SignInButton>
          <p>{isMember ? "Don't have an account?" : 'Already a member?'}{' '}
            <MemberButton type='button' className='member-btn'
                          onClick={toggleIsMember}>{isMember ? 'register' : 'login'}</MemberButton>
          </p>
        </Wrapper>
      )}
    </Formik>
  )
}
