import {Form, Formik, FormikHelpers} from 'formik'
import {Input} from 'Input'
import {searchFormSchema} from 'lib'
import {ButtonBlock} from 'styled'
import styled from 'styled-components'

const Wrapper = styled.section`
  background: var(--white);
  padding: .5rem;
  margin: .5rem 0;
  .form {
    width: 100%;
    max-width: 100%;
  }
  
  h5 {
    font-weight: 700;
  }
  
  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .btn-block {
      margin-top: 0;
    }
  }
`

export interface SearchFormValues {
  query: string
}


export const SearchForm = ({ onSubmit}: {onSubmit: (values: SearchFormValues) => void}) => {
  const handleSubmit = async (values: SearchFormValues, { setSubmitting}: FormikHelpers<SearchFormValues>) => {
    setSubmitting(true)
    onSubmit(values)
  }
  return (
    <Wrapper>
      <h5>Search</h5>
      <Formik initialValues={{query: ''}} onSubmit={handleSubmit}
              validationSchema={searchFormSchema}
      >
        {({isSubmitting}) => (
          <Form>
            <Input label='Query' name='query' type='text'/>
            <ButtonBlock disabled={isSubmitting}>Search</ButtonBlock>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}