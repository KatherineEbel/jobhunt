import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AuthUser} from 'lib'
import {jobHuntApi} from 'services/jobHuntApi'
import { RootState } from 'app/store'

type AuthState = {
  user: AuthUser | null
}

const localUser = () => {
  const json = localStorage.getItem('jhUser')
  if (!json) return null
  return JSON.parse(json)
}

const initialState: AuthState = {user: localUser()}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
    setCredentials: (state, action: PayloadAction<{ user: AuthUser }>) => {
      state.user = action.payload.user
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(jobHuntApi.endpoints.login.matchPending, (state, action) => {
        console.log('login pending', action)
      })
      .addMatcher(jobHuntApi.endpoints.updateProfile.matchFulfilled, (state, action) => {
        console.log('update fulfilled', action)
        state.user = action.payload
      })
      .addMatcher(jobHuntApi.endpoints.login.matchFulfilled, (state, action)=> {
        console.log('login fulfilled', action)
        state.user = action.payload.user
      })
      .addMatcher(jobHuntApi.endpoints.login.matchRejected, (state, action)=> {
        console.log('login rejected', action)
      })
      .addMatcher(jobHuntApi.endpoints.register.matchPending, (state, action) => {
        console.log('register pending', action)
      })
      .addMatcher(jobHuntApi.endpoints.register.matchFulfilled, (state, action) => {
        console.log('register fulfilled', action)
      })
      .addMatcher(jobHuntApi.endpoints.register.matchPending, (state, action) => {
        console.log('register rejected', action)
      })
  }
})

export const {setCredentials, logout} = slice.actions
export default slice.reducer

export const selectCurrentUser = (state: RootState) => {
  return state.auth.user
}