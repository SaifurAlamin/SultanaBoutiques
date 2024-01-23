import { apiSlice } from "./apiSlice";

const allcategoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: (id) => ({
        url: `/home/single-category-all-products/${id}`,
      }),
      providesTags: ["home/single-category-all-products"],
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
  }),
});

export const { useGetAllCategoryQuery } = allcategoriesApi;
