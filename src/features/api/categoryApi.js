import { apiSlice } from "./apiSlice";

const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: (userId) => ({
        url: `/product/category`,
      }),
      providesTags: ["/product/category"],
    }),
  }),
});

export const { useGetAllCategoryQuery } = categoryApi;
