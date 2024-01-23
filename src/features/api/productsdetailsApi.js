import { apiSlice } from "./apiSlice";

const productsdetailsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `/home/productDetails/${productId}`,
      }),
      providesTags: ["home/productDetails"],
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

export const { useGetProductDetailsQuery } = productsdetailsApi;
