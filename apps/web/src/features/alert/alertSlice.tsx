import {AsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Alert} from 'lib'
import {RootState} from 'app/store'
import {jobHuntApi} from 'services/jobHuntApi'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, never>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>

interface AlertState {
  alerts: Alert[]
}

const slice = createSlice({
  name: 'alert',
  initialState: {
    alerts: []
  } as AlertState,
  reducers: {
    enqueueAlert: (state, action:PayloadAction<Alert>) => {
      state.alerts.unshift(action.payload)
    },
    dequeueAlert: (state) => {
      state.alerts.pop()
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(jobHuntApi.endpoints.login.matchFulfilled, (state, action) => {
      const user = action.payload.user
      state.alerts.push({type: 'success', message: `Welcome ${user.firstName}`})
    })
      .addMatcher(
        (action): action is RejectedAction => action.type.endsWith('/rejected'),
        (state, action) => {
          if (!action.payload) return
          const {data} = action.payload
          if (typeof data === 'object' && data !== null) {
            if ('error' in data) {
              state.alerts.push({type: 'danger', message: (data as { error: string}).error})
            }
          }
        }
      )
      .addMatcher(jobHuntApi.endpoints.addJob.matchFulfilled, (state) => {
        state.alerts.push({type: 'success', message: 'Application successfully added'})
      })
      .addMatcher(jobHuntApi.endpoints.editJob.matchFulfilled, (state) => {
        state.alerts.push({type: 'success', message: 'Application updated'})
      })
      .addMatcher(jobHuntApi.endpoints.deleteJob.matchFulfilled, (state) => {
        state.alerts.push({type: 'success', message: 'Application deleted'})
      })
      .addMatcher(jobHuntApi.endpoints.updateProfile.matchFulfilled, (state) => {
        state.alerts.push({type: 'success', message: 'Profile updated'})
      })
  },
})

export const { enqueueAlert, dequeueAlert } = slice.actions
export default slice.reducer

export const selectAlerts = (state: RootState) => state.alerts.alerts