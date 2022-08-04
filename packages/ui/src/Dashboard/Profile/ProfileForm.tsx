import {Form, Formik, FormikHelpers} from 'formik'
import * as React from 'react'
import {Input} from 'Input'
import {ButtonBlock} from 'styled'
import styled from 'styled-components'
import * as yup from 'yup'

const profileSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
})


export interface ProfileValues {
  firstName: string
  lastName: string
  email: string
}

export interface ProfileFormProps {
  onSubmit: (values: ProfileValues) => void
  user?: Partial<ProfileValues>
}

const FormGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-evenly;
  align-items: center;
  
  button {
    height: 2.4rem;
    margin-top: 2rem;
  }
`

export const ProfileForm = ({onSubmit, user}:ProfileFormProps) => {

  const handleSubmit = async (
    values: ProfileValues,
    { setSubmitting}: FormikHelpers<ProfileValues>
  ) => {
    setSubmitting(true)
    onSubmit(values)
  }
  return (
    <Formik initialValues={{
      firstName: '',
      lastName: '',
      email: '',
      ...user,
    }} onSubmit={handleSubmit}
            validationSchema={profileSchema}
    >
      {({isSubmitting}) => (
        <Form>
          <FormGroup>
            <Input label='First Name' type='text' name='firstName'/>
            <Input label="Last Name" type="text" name="lastName" />
          </FormGroup>
          <FormGroup>
            <Input label="Email" type="text" name="email" />
            <ButtonBlock type="submit" disabled={isSubmitting}>
              save changes
            </ButtonBlock>
          </FormGroup>
        </Form>
        )}
    </Formik>
  )
}