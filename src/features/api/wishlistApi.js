import { apiSlice } from "./apiSlice";

const wishlistApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllWishList: builder.query({
      query: (userId) => ({
        url: `/show_wishlist/${userId}`,
      }),
      providesTags: ["show_wishlist"],
    }),

    addToWishList: builder.mutation({
      query: (data) => ({
        url: `/addWishList`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["show_wishlist"],
    }),
    removeSingleWishList: builder.mutation({
      query: (id) => ({
        url: `/wishlist_delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["show_wishlist"],
    }),
    removeAllWishList: builder.mutation({
      query: (id) => ({
        url: `/all_wishlist_delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["show_wishlist"],
    }),
  }),
});

export const {
  useGetAllWishListQuery,
  useRemoveSingleWishListMutation,
  useAddToWishListMutation,
  useRemoveAllWishListMutation,
} = wishlistApi;
