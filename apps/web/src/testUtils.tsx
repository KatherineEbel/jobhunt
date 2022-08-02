import React, { FC, ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { AppContextType, AppProvider } from 'context/appContext'
import { BrowserRouter } from 'react-router-dom'

export const AllTheProviders: FC<{
  children: React.ReactNode
  value: AppContextType
}> = ({ children, value }) => {
  return (
    <BrowserRouter>
      <AppProvider value={value}>{children}</AppProvider>
    </BrowserRouter>
  )
}

type CustomOptions = Omit<RenderOptions, 'wrapper'> & { value: AppContextType }

const customRender = (ui: ReactElement, options: CustomOptions) =>
  render(ui, {
    wrapper: (props) => (
      <AllTheProviders value={options.value}>{props.children}</AllTheProviders>
    ),
    ...options,
  })

export * from '@testing-library/react'
export { customRender as render }
