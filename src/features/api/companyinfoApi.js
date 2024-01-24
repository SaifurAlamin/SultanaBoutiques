import { apiSlice } from "./apiSlice";

const companyinfoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompanyInfo: builder.query({
      query: (productId) => ({
        url: `/product/company/info`,
      }),
      providesTags: ["product/company/info"],
    }),

    // addToWishList: builder.mutation({
    //   query: (data) => ({
    //     url: `/addWishList`,
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["show_wishlist"],
    // }),
    // removeSingleWishList: builder.mutation({
    //   query: (id) => ({
    //     url: `/wishlist_delete/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["show_wishlist"],
    // }),
    // removeAllWishList: builder.mutation({
    //   query: (id) => ({
    //     url: `/all_wishlist_delete/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["show_wishlist"],
    // }),
  }),
});

export const { useGetCompanyInfoQuery } = companyinfoApi;
