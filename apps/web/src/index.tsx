import 'normalize.css'
import {setupStore} from 'app/store'
import React from 'react'
import { createRoot } from 'react-dom/client'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import './index.css'
import reportWebVitals from './reportWebVitals'

const root = document.getElementById('root')
if (root === null) throw new Error('root element not found')

const store = setupStore()

createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App/>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
