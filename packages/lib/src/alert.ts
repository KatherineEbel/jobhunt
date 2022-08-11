export type AlertType = 'success' | 'danger'

export interface Alert {
  type: AlertType
  message: string
}
