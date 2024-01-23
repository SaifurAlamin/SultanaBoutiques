import { apiSlice } from "./apiSlice";

const fetchallproductsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPopularProducts: builder.query({
      query: (data) => ({
        url: `/home/popular/product/get`,
      }),
      providesTags: ["popularProduct"],
    }),
  }),
});

export const { useGetPopularProductsQuery } = fetchallproductsApi;
