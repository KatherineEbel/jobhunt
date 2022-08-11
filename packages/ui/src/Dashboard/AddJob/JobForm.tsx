import {Field, Form, Formik, FormikHelpers, FormikState} from 'formik'
import {Input} from 'Input'
import { ApplicationStatus, ContractType, CreateJobRequest, createJobSchema, Job} from 'lib'
import * as React from 'react'
import {ButtonBlock} from 'styled'
import styled from 'styled-components'
import {Select} from 'Select'

const Group = styled.div`
  align-items: center;
  display: flex;
  gap: 1rem;
`

const ButtonGroup = styled(Group)`
  padding-top: 2rem;
`

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: .5rem;
  background: var(--white);
  border-radius: var(--borderRadius);
  padding: .5rem;
`

const ButtonReset = styled(ButtonBlock)`
  background: var(--grey-500)
`

export interface JobFormProps {
  job?: Omit<Job, 'createdBy' | 'id'>
  onSubmit: (values: CreateJobRequest) => void
  isSuccess: boolean | undefined
}

const contractOptions = Object.values(ContractType).map(value => {
  return ({
    label: value,
    value,
  })
})

const statusOptions = Object.values(ApplicationStatus).map(value => {
  return ({
    label: value,
    value,
  })
})

export const JobForm = ({onSubmit, job, isSuccess}: JobFormProps) => {
  let resetHandle: (nextState?: (Partial<FormikState<CreateJobRequest>> | undefined)) => void = () => undefined

  if(isSuccess) {
    resetHandle()
  }

  const handleSubmit = async (
    values: CreateJobRequest,
    {setSubmitting, resetForm}: FormikHelpers<CreateJobRequest>
  ) => {
    resetHandle = resetForm
    setSubmitting(true)
    onSubmit(values)
  }

  return (
    <Formik
      initialValues={{position: '', company: '', location: 'my location',
        status: ApplicationStatus.pending, contract: ContractType.fulltime,
        ...job}}
      validationSchema={createJobSchema}
      onSubmit={handleSubmit}
    >
      {({isSubmitting}) => (
        <StyledForm>
          <Group>
            <Field type='hidden' name='id' />
            <Input label='Position' type='text' name='position'/>
            <Input label='Company' type='text' name='company'/>
            <Input label='Location' type='text' name='location'/>
          </Group>
          <Group>
            <Select label='Status' options={statusOptions} name='status'/>
            <Select label='Contract' options={contractOptions} name='contract'/>
            <ButtonGroup>
              <ButtonBlock type='submit' disabled={isSubmitting}>
                Submit
              </ButtonBlock>
              <ButtonReset type='reset'>Clear</ButtonReset>
            </ButtonGroup>
          </Group>
        </StyledForm>
      )}

    </Formik>
  )
}
