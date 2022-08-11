import {combineReducers, configureStore, PreloadedState} from '@reduxjs/toolkit'
import { jobHuntApi } from 'services/jobHuntApi'
import authReducer from 'features/auth/authSlice'
import jobsReducer from 'features/jobs/jobsSlice'
import alertReducer from 'features/alert/alertSlice'

const rootReducer = combineReducers({
  [jobHuntApi.reducerPath]: jobHuntApi.reducer,
  alerts: alertReducer,
  auth: authReducer,
  jobs: jobsReducer,
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(jobHuntApi.middleware),
    preloadedState,
    reducer: rootReducer,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']