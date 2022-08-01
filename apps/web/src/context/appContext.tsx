import {Alert, AppActionType, appReducer} from 'context/appReducer'
import {createCtx} from 'context/createCtx'
import {ReactNode, useReducer} from 'react'

interface AppContextType {
  loading: boolean
  alert: {
    message: string
    type: 'success' | 'danger'
  } | null
  displayAlert: (alert: Alert) => void
}

type AppState = Pick<AppContextType, 'loading'| 'alert'>

export const initialState: AppState = {
  loading: false,
  alert: null,
}

const [useAppContext, AppContextProvider] = createCtx<AppContextType>()

interface AppProviderProps {
  children: ReactNode
}

const AppProvider = ({children}: AppProviderProps) => {
  const [state, dispatch ] = useReducer(appReducer, initialState, undefined)

  const displayAlert = (alert: Alert) => {
    dispatch({type: AppActionType.SetAlert, payload: alert})
    setTimeout(() => dispatch({type: AppActionType.ClearAlert, payload: null}))
  }

  return (
    <AppContextProvider value={{...state, displayAlert}}>
      {children}
    </AppContextProvider>
  )
}

export { AppProvider, useAppContext }