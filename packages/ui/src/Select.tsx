import * as React from "react";
import styled from 'styled-components'
import {useField} from 'formik'

export interface SelectOption {
  label: string
  value: string
}

export interface SelectProps {
  label: string
  options: SelectOption[]
  name: string
}

const Wrapper = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: 600;
  gap: .5rem;
  position: relative;
  width: 100%;

  & select {
    background: var(--backgroundColor);
    border: none;
    border-radius: var(--borderRadius);
    padding: .7rem 1rem;
  }
  
  .select-error {
    color: var(--red-dark);
    font-weight: 600;
    position: absolute;
    top: 55%;
    right: .5rem;
  }
`

export const Select = ({label, name, options}: SelectProps) => {
  const [field, meta] = useField(name)
  return (
    <Wrapper>
      {label}
      <select {...field} name={name}>
        {options.map((option: SelectOption) => {
          return (
            <option key={option.value} value={option.value}>{option.label}</option>
          )
        })}
      </select>
      {meta.error && meta.touched && <span className='select-error'>{meta.error}</span>}
    </Wrapper>
  )
}
