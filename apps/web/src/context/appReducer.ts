export enum AppActionType {
  SetLoading = 'app/setLoading',
  SetAlert = 'app/setAlert',
  ClearAlert = 'app/removeAlert',
}

export interface Action {
  type: AppActionType
  payload: boolean | Alert | null
}

export interface SetLoadingAction extends Action {
  payload: boolean
}

export interface SetAlert extends Action {
  payload: Alert
}

export interface ClearAlert extends Action {
  payload: null
}

export type AppAction = SetLoadingAction | SetAlert | ClearAlert

export interface Alert {
  message: string
  type: 'success' | 'danger'
}

export interface AppState {
  loading: boolean
  alert: Alert | null
}

export function appReducer(state: AppState, {type, payload}: AppAction): AppState {
  switch (type) {
  case AppActionType.SetAlert:
    return {
      ...state,
      alert: payload as Alert
    }
  default:
    return state
  }
}