import {Alert, AppActionType, appReducer, initialState,} from 'context/appReducer'
import {createCtx} from 'context/createCtx'
import {useJobs} from 'hooks/useJobs'
import {CreateJobRequest, Job} from 'lib'
import {ReactNode, useEffect, useReducer} from 'react'
import {useNavigate} from 'react-router-dom'
import {AuthUser, LoginUser, RegisterUser, UpdateUser} from 'lib'
import {useFetch} from 'use-http'
import useLocalStorageState from 'use-local-storage-state'


export interface AppContextType {
  jobs: Job[],
  user: AuthUser | null
  addJob: (request: CreateJobRequest) => Promise<boolean>
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
  const [localUser, setLocalUser] = useLocalStorageState<AuthUser | null>('jhUser', { defaultValue: value ? value.user : null})
  const [state, dispatch] = useReducer(appReducer, value ? { user: value.user, jobs: value.jobs, alert: value.alert} : {...initialState, user: localUser}, undefined)
  const {jobs, addJob} = useJobs()
  const {patch, post, response, error} = useFetch<{user: AuthUser}>(BASE_URL)
  const navigate = useNavigate()

  useEffect(() => {
    if (state.alert === null) return
    setTimeout(() => {
      dispatch({type: AppActionType.ClearAlert})
    }, 5000)
  }, [state.alert])

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
    const data = await post('/auth/login', request)
    if (response.ok) {
      dispatch({
        type: AppActionType.AuthUserSuccess,
        payload: data.user,
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
    setLocalUser(null)
    navigate('/landing')
  }

  const updateUser = async (user: UpdateUser) => {
    dispatch({type: AppActionType.AuthUserStart,})
    const data = await patch(`/users/${state.user?.id}`, user)
    if (response.ok) {
      dispatch({
        type: AppActionType.AuthUserUpdateSuccess,
        payload: data.user,
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
        value || {
          ...state,
          addJob,
          displayAlert,
          logout,
          loginUser,
          jobs,
          registerUser,
          updateUser
        }
      }
    >
      {children}
    </AppContextProvider>
  )
}

export {AppProvider, useAppContext}
