import { api } from "../api";

export const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    postData: builder.mutation({
      query: (values) => ({
        url: '/v2/post/create_post',
        method: 'POST',
        body: values,
      }),
      invalidatesTags: ['postTag'],
    }),

    getPostData: builder.query({
      query: ({ page = 1, limit = 10, search = "", status = "" }) => ({
        url: `/v2/post/get_all_posts?page=${page}&limit=${limit}&search=${search}&status=${status}`,
        method: "GET",
      }),
      providesTags: ["postTag"],
    }),
    getMyPostData: builder.query({
      query: (id) => ({
        url: `/v2/post/get_post_by_id/${id}`,
        method: "GET",
      }),
      providesTags: ["postTag"],
    }),

    updatePostData: builder.mutation({
      query: ({ _id, postPayload }) => ({
        url: `/v2/post/edit_post/${_id}`,
        method: "PUT",
        body: postPayload,
      }),
      invalidatesTags: ["postTag"],
    }),

    deletePostData: builder.mutation({ // Renamed to follow convention
      query: ( id ) => ({
        url: `/v2/post/delete_post/${id}`,
        method: "PUT", 
      }),
      invalidatesTags: ["postTag"],
    }),
  }),
  
});

// Export hooks for usage in functional components
export const {
  usePostDataMutation,
  useGetPostDataQuery,
  useGetMyPostDataQuery,
  useUpdatePostDataMutation,
  useDeletePostDataMutation, // Updated to match the renamed function
} = postApi;