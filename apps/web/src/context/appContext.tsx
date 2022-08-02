import {
  Alert,
  AppActionType,
  appReducer,
  initialState,
} from 'context/appReducer'
import { createCtx } from 'context/createCtx'
import { ReactNode, useEffect, useReducer } from 'react'
import { LoginUser, RegisterUser, User } from 'services/auth'
import { useFetch } from 'use-http'

export interface AppContextType {
  loading: boolean
  user: User | null
  alert: {
    message: string
    type: 'success' | 'danger'
  } | null
  displayAlert: (alert: Alert) => void
  registerUser: (request: RegisterUser) => void
}

const [useAppContext, AppContextProvider] = createCtx<AppContextType>()

interface AppProviderProps {
  value?: AppContextType
  children: ReactNode
}

const BASE_URL = process.env.REACT_APP_API_URL

const AppProvider = ({ children, value }: AppProviderProps) => {
  const [state, dispatch] = useReducer(appReducer, initialState, undefined)
  const { post, response, error } = useFetch(BASE_URL)

  useEffect(() => {
    if (state.alert === null) return
    setTimeout(() => {
      dispatch({ type: AppActionType.ClearAlert })
    }, 5000)
  }, [state.alert])

  const displayAlert = (alert: Alert) => {
    dispatch({ type: AppActionType.SetAlert, payload: alert })
  }

  const registerUser = async (request: RegisterUser) => {
    dispatch({ type: AppActionType.AuthUserStart })
    const user = await post('/auth/register', request)
    if (response.ok) {
      dispatch({
        type: AppActionType.AuthUserSuccess,
        payload: user,
      })
      localStorage.setItem('registeredUser', user)
    }
    if (error) {
      dispatch({
        type: AppActionType.AuthUserError,
        payload: error.message,
      })
    }
  }

  const loginUser = async (request: LoginUser) => {
    dispatch({ type: AppActionType.AuthUserStart })
    const user = await post('/auth/login', request)
    if (response.ok) {
      dispatch({
        type: AppActionType.AuthUserSuccess,
        payload: user,
      })
      localStorage.setItem('registeredUser', user)
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
      value={value || { ...state, displayAlert, registerUser }}
    >
      {children}
    </AppContextProvider>
  )
}

export { AppProvider, useAppContext }
