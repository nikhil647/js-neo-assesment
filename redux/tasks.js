// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
  }),
  tagTypes: ["Tasks"], //Identifire for caching
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/tasks",
      providesTags: ["Tasks"],
    }),
    addTask: builder.mutation({
      query: (body) => ({
        url: "/tasks",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          mode: "cors",
        },
        body: JSON.stringify(body),
      }),
      invalidatesTags: ["Tasks"],
    }),
    editTask: builder.mutation({
      query: (body) => ({
        url: `/tasks/${body._id}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          mode: "cors",
        },
        body: JSON.stringify(body),
      }),
      invalidatesTags: ["Tasks"],
    }),
    deleteTask: builder.mutation({
      query: (body) => ({
        url: `/tasks/${body._id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          mode: "cors",
        },
        body: JSON.stringify(body),
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
//export const { useGetPostsQuery } = apiSlice
export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useEditTaskMutation,
  useDeleteTaskMutation,
} = taskSlice;
