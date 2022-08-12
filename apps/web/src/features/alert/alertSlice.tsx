import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Alert} from 'lib'
import {RootState} from 'app/store'
import {jobHuntApi} from 'services/jobHuntApi'

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
  },
  extraReducers: (builder) => {
    builder.addMatcher(jobHuntApi.endpoints.login.matchFulfilled, (state, action) => {
      const user = action.payload.user
      state.alerts.push({type: 'success', message: `Welcome back ${user.firstName}`})
    })

    builder.addMatcher(jobHuntApi.endpoints.login.matchRejected, (state, action) => {
      if (!action.payload) return
      const {data} = action.payload
      if (typeof data === 'object' && data !== null) {
        if ('error' in data) {
          state.alerts.push({type: 'danger', message: (data as { error: string}).error})
        }
      }
    })
  },
})

export const { createAlert } = slice.actions
export default slice.reducer

export const selectAlerts = (state: RootState) => state.alerts.alerts