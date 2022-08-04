import {Input} from 'Input'
import {Logo} from 'Logo'
import { useEffect, useState } from 'react'
import * as React from 'react'
import styled from 'styled-components'
import { Form, Formik, FormikHelpers, FormikState } from 'formik'
import * as Yup from 'yup'
import { ButtonBlock } from 'styled'

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
  padding: 2rem;
  max-width: 90vw;
  width: 400px;
  max-height: 650px;
`

export interface Values {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface RegisterFormProps {
  isMember: boolean
  reset: boolean
  toggleIsMember: () => void
  onSubmit: (values: Values) => void
}

export const RegisterForm = ({
  isMember = false,
  onSubmit,
  reset,
  toggleIsMember,
}: RegisterFormProps) => {
  const [resetFormHandle, setResetFormHandle] =
    useState<(nextState?: Partial<FormikState<Values>> | undefined) => void>()

  const handleSubmit = async (
    values: Values,
    { setSubmitting, resetForm }: FormikHelpers<Values>
  ) => {
    setResetFormHandle(resetForm)
    setSubmitting(true)
    onSubmit(values)
  }

  useEffect(() => {
    if (!reset) return
    resetFormHandle && resetFormHandle()
  }, [reset])

  return (
    <Formik
      initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
      validationSchema={Yup.object({
        isMember: Yup.boolean().default(isMember),
        firstName: Yup.string().when('isMember', {
          is: false,
          then: Yup.string().required('first name is required'),
        }),
        lastName: Yup.string().when('isMember', {
          is: false,
          then: Yup.string().required('last name is required'),
        }),
        email: Yup.string()
          .email('Please provide a valid email')
          .required('Email is required'),
        password: Yup.string().when('isMember', {
          is: false,
          then: Yup.string().required('Password is required'),
        }),
      })}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Wrapper>
          <Logo />
          <h3>{isMember ? 'Login' : 'register'}</h3>
          {!isMember && (
            <>
              <Input label="First Name" type="text" name="firstName" />
              <Input label="Last Name" type="text" name="lastName" />
            </>
          )}
          <Input label="Email" type="text" name="email" />
          <Input label="Password" type="password" name="password" />
          <SignInButton type="submit" disabled={isSubmitting}>
            Submit
          </SignInButton>
          <p>
            {isMember ? "Don't have an account?" : 'Already a member?'}{' '}
            <MemberButton
              type="button"
              className="member-btn"
              onClick={toggleIsMember}
            >
              {isMember ? 'register' : 'Login'}
            </MemberButton>
          </p>
        </Wrapper>
      )}

    </Formik>
  )
}
