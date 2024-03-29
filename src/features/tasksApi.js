import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'api' }),
  tagTypes: ['Task'],
  endpoints: builder => ({
    getTasks: builder.query({
      query: () => '/',
      providesTags: ['Task'],
    }),
    getTask: builder.query({
      query: id => `/${id}`,
      invalidatesTags: ['Task'],
    }),
    addTask: builder.mutation({
      query: task => ({
        url: '/',
        method: 'POST',
        body: task,
      }),
      invalidatesTags: ['Task'],
    }),
    updateTask: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: rest,
      }),
      invalidatesTags: ['Task'],
    }),
    deleteTask: builder.mutation({
      query: id => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),
  }),
});

// Export hooks for usage in functional components, which are auto-generated based on the defined endpoints
export const { useGetTasksQuery, useAddTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } = tasksApi;