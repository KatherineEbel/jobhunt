import {Form, Formik, FormikHelpers} from 'formik'
import {Input} from 'Input'
import {ApplicationStatus, Contract, ContractType, JobQuery, JobSortDescriptor, searchFormSchema, Status} from 'lib'
import {Loader} from 'Loader'
import {Select} from 'Select'
import {Button} from 'styled'
import styled from 'styled-components'

const ResetButton = styled(Button)`
  background: var(--red-light);
  color: var(--red-dark);
  
  &:hover {
    background: var(--red-dark);
    color: var(--red-light);
  }
`

const Wrapper = styled.section`
  padding: .5rem;
  margin: .5rem 0;
  .form {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 100%;
  }
  
  .form-controls {
    display: grid;
  }
  
  .form .actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    margin-left: auto;
  }
  
  h5 {
    font-weight: 700;
    margin-bottom: 1rem;
  }
  
  @media (min-width: 768px) {
    .form-controls {
      grid-column-gap: 0.5rem;
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 992px) {
    .form-controls {
      grid-column-gap: 1rem;
      grid-template-columns: repeat(3, 1fr);
    }
  }
`

export type SearchFormValues = Omit<JobQuery, 'status' | 'contract' | 'page'> & {
  status: ApplicationStatus | 'all'
  contract: ContractType | 'all'
}


export const SearchForm = ({ onReset = () => undefined, onSubmit}: {onReset: () => void, onSubmit: (values: SearchFormValues) => void}) => {
  const handleSubmit = async (values: SearchFormValues, { setSubmitting}: FormikHelpers<SearchFormValues>) => {
    setSubmitting(true)
    onSubmit(values)
  }
  return (
    <Wrapper>
      <h5>Filter Jobs</h5>
      <Formik initialValues={{position: '', contract: 'all', status: 'all', sort: JobSortDescriptor.latest}} onSubmit={handleSubmit}
              validationSchema={searchFormSchema} enableReinitialize={false}
      >
        {({isSubmitting}) => (
          <Form className='form'>
            {isSubmitting && <Loader/>}
            <div className='form-controls'>
              <Input label='Position' name='position' type='text'/>
              <Select label='Contract Type' options={
                [{label: 'all', value: 'all'},
                  ...Contract.map(contract => ({
                      label: contract,
                      value: contract
                    }))
                ]
              } name='contract'/>
              <Select label='Application Status' options={
                [{label: 'all', value: 'all'},
                  ...Status.map(status => ({
                      label: status,
                      value: status
                    }))
                ]
              } name='status'/>
              <Select label='Sort By' options={
                Object.values(JobSortDescriptor).map(value => ({
                  label: value,
                  value,
                }))
              } name='sort'/>
            </div>
            <div className='actions'>
              <Button type='submit' disabled={isSubmitting}>Search</Button>
              <ResetButton type='reset' onClick={onReset}>Clear Filters</ResetButton>
            </div>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}