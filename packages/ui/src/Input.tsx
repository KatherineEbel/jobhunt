import * as React from "react";
import styled from 'styled-components'
import {useField} from 'formik'


export interface InputProps {
  label: string
  name: string
  type: string
}

const Wrapper = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: 600;
  gap: .5rem;
  position: relative;
  width: 100%;

  & input {
    background: var(--backgroundColor);
    border: none;
    border-radius: var(--borderRadius);
    padding: .8rem 1rem;
  }
  
  .input-error {
    color: var(--red-dark);
    font-weight: 600;
    position: absolute;
    top: 55%;
    right: .5rem;
  }
`

export const Input = ({ label, ...props}: InputProps) => {
  const [field, meta] = useField(props)
  return (
    <Wrapper>
      {label}
      <input {...field} {...props}/>
      {meta.error && meta.touched && <span className='input-error'>{meta.error}</span>}
    </Wrapper>
  )
}
