import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Education, User, Experience } from '@/types/user'

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    storeUser: builder.mutation<User, Partial<User>>({
      query: ({ ...data }) => ({
        url: '/items/users',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: { data: User }) => response.data,
    }),
    storeEducation: builder.mutation<Education[], Partial<Education[]>>({
      query: ({ ...data }) => ({
        url: '/items/education',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: { data: Education[] }) => response.data,
    }),
    storeExperience: builder.mutation<Experience[], Partial<Experience[]>>({
      query: ({ ...data }) => ({
        url: '/items/experience',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: { data: Experience[] }) => response.data,
    }),
  }),
})

// Export the auto-generated hook query endpoint
export const {
  useStoreUserMutation,
  useStoreEducationMutation,
  useStoreExperienceMutation,
} = apiSlice
