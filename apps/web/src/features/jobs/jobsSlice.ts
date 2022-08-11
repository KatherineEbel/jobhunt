import {createSlice} from '@reduxjs/toolkit'
import {JobResponse} from 'lib'
import {jobHuntApi} from 'services/jobHuntApi'
import {RootState} from 'app/store'

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [] as JobResponse[]
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addMatcher(jobHuntApi.endpoints.jobs.matchFulfilled, (state, action) => {
      state.jobs = action.payload.jobs
    })
    builder.addMatcher(jobHuntApi.endpoints.addJob.matchFulfilled, (state, action) => {
      console.log('job added', action)
      state.jobs.push(action.payload)
    })
    builder.addMatcher(jobHuntApi.endpoints.editJob.matchFulfilled, (state, action) => {
      const job = action.payload
      const jobIdx = state.jobs.findIndex(j => j.id === job.id)
      if (jobIdx < 0) return
      state.jobs[jobIdx] = job
    })
    builder.addMatcher(jobHuntApi.endpoints.deleteJob.matchFulfilled, (state, action) => {
      const job = action.payload
      const jobIdx = state.jobs.findIndex(j => j.id === job.id)
      if (jobIdx < 0) return
      state.jobs.splice(jobIdx, 1)
    })
  },
})

export default jobsSlice.reducer
export const selectJobs = (state: RootState) => state.jobs.jobs
