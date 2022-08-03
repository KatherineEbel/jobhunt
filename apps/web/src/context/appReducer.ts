import { User } from 'services/auth'

export enum AppActionType {
  AuthInit = 'app/authInit',
  AuthLogout = 'app/authLogout',
  AuthUserStart = 'app/authUserStart',
  AuthUserSuccess = 'app/authUserSuccess',
  AuthUserError = 'app/authUserError',
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

export interface SetAlertAction extends Action {
  payload: Alert
}

export interface ClearAlertAction extends Action {
  payload: null
}

export type AppAction =
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
  alert: Alert | null
}

export const initialState: AppState = {
  user: null,
  alert: null,
}

export function appReducer(
  state: AppState = initialState,
  { type, payload = null }: AppAction
): AppState {
  let user: User
  let message: string
  switch (type) {
    case AppActionType.AuthInit:
      return {
        ...state,
        user: payload as User,
      }
    case AppActionType.AuthLogout:
      return {
        ...state,
        user: null,
      }
    case AppActionType.AuthUserStart:
      return {
        ...state,
      }
    case AppActionType.AuthUserSuccess:
      user = payload as User
      message = user.token ? 'Welcome Back!' : 'Welcome to JobHunt!'
      return {
        ...state,
        alert: { message, type: 'success' },
        user,
      }
    case AppActionType.AuthUserError:
      return {
        ...state,
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
