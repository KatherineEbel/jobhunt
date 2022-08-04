import {Alert, AppActionType, appReducer, initialState,} from 'context/appReducer'
import {createCtx} from 'context/createCtx'
import {ReactNode, useEffect, useReducer} from 'react'
import {useNavigate} from 'react-router-dom'
import {LoginUser, RegisterUser, UpdateUser, AuthUser} from 'services/auth'
import {useFetch} from 'use-http'

export interface AppContextType {
  authenticate: () => Promise<boolean>
  user: AuthUser | null
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
  const navigate = useNavigate()

  useEffect(() => {
    if (state.alert === null) return
    setTimeout(() => {
      dispatch({type: AppActionType.ClearAlert})
    }, 5000)
  }, [state.alert])

  useEffect(() => {
    const localUser = localStorage.getItem('jhUser')
    if (localUser) {
      dispatch({type: AppActionType.AuthInit, payload: JSON.parse(localUser)})
    }
  }, [])

  const authenticate = async () => {
    if (state.user && state.user.token) return true
    const localUser = localStorage.getItem('jhUser')
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
      localStorage.setItem('jhRegisterUser', JSON.stringify(user))
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
    localStorage.removeItem('jhUser')
    navigate('/landing')
  }

  const updateUser = async (user: UpdateUser) => {
    dispatch({type: AppActionType.AuthUserStart,})
    const updatedUser = await patch(`/users/${state.user?.id}`, user)
    if (response.ok) {
      dispatch({
        type: AppActionType.AuthUserUpdateSuccess,
        payload: updatedUser,
      })
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
