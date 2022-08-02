import { User } from 'services/auth'

export enum AppActionType {
  AuthUserStart = 'app/authUserStart',
  AuthUserSuccess = 'app/authUserSuccess',
  AuthUserError = 'app/authUserError',
  SetLoading = 'app/setLoading',
  SetAlert = 'app/setAlert',
  ClearAlert = 'app/removeAlert',
}

export interface Action {
  type: AppActionType
  payload?: unknown
}

type AuthUserStartAction = Action

export interface AuthUserSuccessAction extends Action {
  payload: User
}

export interface AuthUserErrorAction extends Action {
  payload: string
}

export interface SetLoadingAction extends Action {
  payload: boolean
}

export interface SetAlertAction extends Action {
  payload: Alert
}

export interface ClearAlertAction extends Action {
  payload: null
}

export type AppAction =
  | SetLoadingAction
  | SetAlertAction
  | ClearAlertAction
  | AuthUserErrorAction
  | AuthUserStartAction
  | AuthUserSuccessAction

export interface Alert {
  message: string
  type: 'success' | 'danger'
}

export interface AppState {
  user: User | null
  loading: boolean
  alert: Alert | null
}

export const initialState: AppState = {
  user: null,
  loading: false,
  alert: null,
}

export function appReducer(
  state: AppState = initialState,
  { type, payload = null }: AppAction
): AppState {
  switch (type) {
    case AppActionType.AuthUserStart:
      return {
        ...state,
        loading: true,
      }
    case AppActionType.AuthUserSuccess:
      return {
        ...state,
        loading: false,
        alert: { message: 'Welcome to JobHunt', type: 'success' },
        user: payload as User,
      }
    case AppActionType.AuthUserError:
      return {
        ...state,
        loading: false,
        alert: { message: payload as string, type: 'danger' },
        user: null,
      }
    case AppActionType.ClearAlert:
      return { ...state, alert: null }
    case AppActionType.SetAlert:
      return {
        ...state,
        alert: payload as Alert,
      }
    default:
      return state
  }
}
