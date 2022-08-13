import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {
  ApplicationStatusStats,
  CreateJobRequest,
  JHUser,
  JobResponse,
  ListResponse,
} from 'lib'
import {JobQuery, LoginRequest, RegisterRequest, UserResponse} from 'lib/src'
import { RootState } from 'app/store'

export const jobHuntApi = createApi({
  reducerPath: 'jobHuntApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState).auth.user?.token
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    }
  }),
  tagTypes: ['Job', 'Stats', 'User'],
  endpoints: (builder) => ({
    jobs: builder.query<ListResponse<JobResponse>, Partial<JobQuery>>({
      query: (filters) => ({
        url: `jobs`,
        params: filters
      }),
      providesTags: (result) =>
        result
          ? [...result.data.map(({ id }) => ({ type: 'Job' as const, id })), 'Job']
          : ['Job'],
    }),
    addJob: builder.mutation<JobResponse, CreateJobRequest>({
      query(body) {
        return {
          url: 'jobs',
          method: 'POST',
          body,
        }
      },
      invalidatesTags: ['Job', 'Stats'],
    }),
    editJob: builder.mutation<JobResponse, CreateJobRequest & {jobId: string}>({
      query(request) {
        const {jobId, ...body} = request
        return {
          url: `jobs/${jobId}`,
          method: 'PATCH',
          body,
        }
      },
      invalidatesTags: (result, error, arg) =>
        [{ type: 'Job', id: arg.jobId }, 'Stats'],
    }),
    deleteJob: builder.mutation<JobResponse, string>({
      query(jobId) {
        return {
          url: `jobs/${jobId}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: (result, error, arg) =>
        [{ type: 'Job', id: arg }, 'Stats'],
    }),
    stats: builder.query<ApplicationStatusStats, undefined>({
      query() {
        return {
          url: 'jobs/stats'
        }
      },
      providesTags: ['Stats']
    }),
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<UserResponse, RegisterRequest>({
      query: (request: RegisterRequest) => ({
        url: 'auth/register',
        method: 'POST',
        body: request,
      }),
    }),
    updateProfile: builder.mutation<UserResponse, Omit<JHUser, 'email' | 'passwordHash'>>({
      query(body) {
        return {
          url: 'profile',
          method: 'PATCH',
          body
        }
      },
    })
  })
})

export const {
  useJobsQuery, useRegisterMutation, useLoginMutation,
  useAddJobMutation, useEditJobMutation, useDeleteJobMutation,
  useUpdateProfileMutation, useStatsQuery,
} = jobHuntApi