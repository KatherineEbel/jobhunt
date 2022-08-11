import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Alert} from 'lib'
import {RootState} from 'app/store'

interface AlertState {
  alerts: Alert[]
}

const slice = createSlice({
  name: 'alert',
  initialState: {
    alerts: []
  } as AlertState,
  reducers: {
    createAlert: (state, action:PayloadAction<Alert>) => {
      state.alerts.push(action.payload)
    }
  }
})

export const { createAlert } = slice.actions
export default slice.reducer

export const selectAlerts = (state: RootState) => state.alerts.alerts