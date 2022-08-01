import {Layout} from 'Layout'
import {Dashboard, Error, Landing, Register} from 'pages'
import React from 'react'
import {Route, Routes} from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index  element={<Dashboard/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/landing' element={<Landing/>}/>
          <Route path='*' element={<Error/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
