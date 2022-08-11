import React, {PropsWithChildren } from 'react'
import {BrowserRouter} from 'react-router-dom'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import type { PreloadedState } from '@reduxjs/toolkit'


import { setupStore } from 'app/store'
import type { AppStore, RootState } from 'app/store'
import {Provider} from 'react-redux'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<unknown>): JSX.Element {
    return <BrowserRouter>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions})}
}

export * from '@testing-library/react'