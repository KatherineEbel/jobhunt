import {Alert, AppActionType, appReducer, initialState,} from 'context/appReducer'
import {createCtx} from 'context/createCtx'
import {ReactNode, useEffect, useReducer} from 'react'
import {LoginUser, RegisterUser, UpdateUser, User} from 'services/auth'
import {useFetch} from 'use-http'

export interface AppContextType {
  authenticate: () => Promise<boolean>
  user: User | null
  alert: {
    message: string
    type: 'success' | 'danger'
  } | null
  displayAlert: (alert: Alert) => void
  registerUser: (request: RegisterUser) => void
  loginUser: (request: LoginUser) => void
  logout: () => void
  updateUser: (request: UpdateUser) => void
}

const [useAppContext, AppContextProvider] = createCtx<AppContextType>()

interface AppProviderProps {
  value?: AppContextType
  children: ReactNode
}

const BASE_URL = process.env.REACT_APP_API_URL

const AppProvider = ({children, value}: AppProviderProps) => {
  const [state, dispatch] = useReducer(appReducer, initialState, undefined)
  const {patch, post, response, error} = useFetch(BASE_URL)

  useEffect(() => {
    if (state.alert === null) return
    setTimeout(() => {
      dispatch({type: AppActionType.ClearAlert})
    }, 5000)
  }, [state.alert])

  useEffect(() => {
    const localUser = localStorage.getItem('jh-authUser')
    if (localUser) {
      dispatch({type: AppActionType.AuthInit, payload: JSON.parse(localUser)})
    }
  }, [])

  const authenticate = async () => {
    if (state.user && state.user.token) return true
    const localUser = localStorage.getItem('jh-authUser')
    if (localUser) {
      dispatch({type: AppActionType.AuthInit, payload: JSON.parse(localUser)})
      return Promise.resolve(true)
    }
    return false
  }

  const displayAlert = (alert: Alert) => {
    dispatch({type: AppActionType.SetAlert, payload: alert})
  }

  const registerUser = async (request: RegisterUser) => {
    dispatch({type: AppActionType.AuthUserStart})
    const user = await post('/auth/register', request)
    if (response.ok) {
      dispatch({
        type: AppActionType.AuthUserSuccess,
        payload: user,
      })
      localStorage.setItem('jh-registerUser', JSON.stringify(user))
    }
    if (error) {
      dispatch({
        type: AppActionType.AuthUserError,
        payload: error.message,
      })
    }
  }

  const loginUser = async (request: LoginUser) => {
    dispatch({type: AppActionType.AuthUserStart})
    const user = await post('/auth/login', request)
    if (response.ok) {
      dispatch({
        type: AppActionType.AuthUserSuccess,
        payload: user,
      })
      localStorage.removeItem('jh-registerUser')
      localStorage.setItem('jh-authUser', JSON.stringify(user))
    }
    if (error) {
      dispatch({
        type: AppActionType.AuthUserError,
        payload: error.message,
      })
    }
  }

  const logout = () => {
    dispatch({type: AppActionType.AuthLogout})
    localStorage.removeItem('jh-authUser')
  }

  const updateUser = async (user: UpdateUser) => {
    dispatch({type: AppActionType.AuthUserStart,})
    const updatedUser = await patch('/users', user)
    if (response.ok) {
      dispatch({
        type: AppActionType.AuthUserSuccess,
        payload: updatedUser,
      })
      localStorage.setItem('jh-authUser', JSON.stringify(updatedUser))
    }
    if (error) {
      dispatch({
        type: AppActionType.AuthUserError,
        payload: error.message,
      })
    }
  }

  return (
    <AppContextProvider
      value={
        value || {...state, authenticate: authenticate, displayAlert, logout, loginUser, registerUser, updateUser}
      }
    >
      {children}
    </AppContextProvider>
  )
}

export {AppProvider, useAppContext}
