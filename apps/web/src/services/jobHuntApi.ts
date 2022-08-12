import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {
  ApplicationStatusStats,
  AuthUser,
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
    },
  }),
  tagTypes: ['Jobs'],
  endpoints: (builder) => ({
    jobs: builder.query<ListResponse<JobResponse>, Partial<JobQuery>>({
      query: (filters) => ({
        url: `jobs`,
        params: filters
      }),
      providesTags: (result) =>
        result
          ? [
            ...result.data.map(({ id }) => ({ type: 'Jobs' as const, id })),
            { type: 'Jobs', id: 'PARTIAL-LIST' },
          ]
          : [{ type: 'Jobs', id: 'PARTIAL-LIST' }],
    }),
    addJob: builder.mutation<JobResponse, CreateJobRequest>({
      query(body) {
        return {
          url: 'jobs',
          method: 'POST',
          body,
        }
      }
    }),
    editJob: builder.mutation<JobResponse, CreateJobRequest & {jobId: string}>({
      query(request) {
        const {jobId, ...body} = request
        return {
          url: `jobs/${jobId}`,
          method: 'PATCH',
          body,
        }
      }
    }),
    deleteJob: builder.mutation<JobResponse, string>({
      query(jobId) {
        return {
          url: `jobs/${jobId}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: (result, error, id) => [
        { type: 'Jobs', id },
        { type: 'Jobs', id: 'PARTIAL_lisT'}
      ]
    }),
    stats: builder.query<ApplicationStatusStats, undefined>({
      query() {
        return {
          url: 'jobs/stats'
        }
      }
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
    updateProfile: builder.mutation<AuthUser, Omit<JHUser, 'email' | 'passwordHash'>>({
      query(body) {
        return {
          url: 'profile',
          body
        }
      }
    })
  })
})

export const {
  useJobsQuery, useRegisterMutation, useLoginMutation,
  useAddJobMutation, useEditJobMutation, useDeleteJobMutation,
  useUpdateProfileMutation, useStatsQuery,
} = jobHuntApi