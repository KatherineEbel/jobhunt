import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AuthUser} from 'lib'
import {jobHuntApi} from 'services/jobHuntApi'
import { RootState } from 'app/store'

type AuthState = {
  user: AuthUser | null
  registered: boolean
}

const localStorageKeys = {
  user: 'jhUser',
  registered: 'jhUserRegistered'
}


const localUser = () => {
  const json = localStorage.getItem(localStorageKeys.user)
  if (!json) return null
  return JSON.parse(json)
}

const initialState: AuthState = {user: localUser(), registered: !!localStorage.getItem(localStorageKeys.registered)}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem(localStorageKeys.user)
      return initialState
    },
    setCredentials: (state, action: PayloadAction<{ user: AuthUser }>) => {
      state.user = action.payload.user
    },
    toggleRegistered: (state) => {
      state.registered = !state.registered
      if (state.registered) {
        localStorage.setItem(localStorageKeys.registered, 'true')
      } else {
        localStorage.removeItem(localStorageKeys.registered)
      }
    },
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
        localStorage.setItem(localStorageKeys.user, JSON.stringify(state.user))
      })
      .addMatcher(jobHuntApi.endpoints.register.matchFulfilled, (state) => {
        state.registered = true
        localStorage.setItem(localStorageKeys.registered, 'true')
      })
  }
})

export const {logout, toggleRegistered, setCredentials} = slice.actions
export default slice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user

export const selectIsMember = (state: RootState) => state.auth.registered