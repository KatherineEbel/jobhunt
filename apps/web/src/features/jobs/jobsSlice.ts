import {createSlice} from '@reduxjs/toolkit'
import {JobResponse, ListResponse} from 'lib'
import {jobHuntApi} from 'services/jobHuntApi'
import {RootState} from 'app/store'

type Pagination = Omit<ListResponse<JobResponse>, 'data'>

export interface JobState {
  jobs: JobResponse[]
  pagination: Pagination
}

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [] as JobResponse[],
    pagination: {
      page: 1,
      perPage: 6,
      total: 0,
      totalPages: 1,
    }
  } as JobState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addMatcher(jobHuntApi.endpoints.jobs.matchFulfilled, (state, action) => {
      const { data, ...pagination} = action.payload
      state.jobs = data
      state.pagination = pagination
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
export const selectPagination = (state: RootState) => state.jobs.pagination
