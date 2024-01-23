import { apiSlice } from "./apiSlice";

const showcartlistApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCartShow: builder.query({
      query: (userIP) => ({
        url: `/show_cartlist/${userIP}`,
      }),
      providesTags: ["show_cartlist"],
    }),
    searchGiftBox: builder.query({
      query: (name) => ({
        url: `/giftbox/search?name=${name}`,
      }),
      invalidatesTags: ["giftbox"],
    }),
    getAllProducts: builder.query({
      query: () => ({
        url: "/home/all-product",
      }),
      providesTags: ["home/all-product"],
    }),
    addToCart: builder.mutation({
      query: (data) => ({
        url: `/addToCartProduct`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["show_cartlist"],
    }),
    removeSingleCart: builder.mutation({
      query: (id) => ({
        url: `/cartlist_delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["show_cartlist"],
    }),
  }),
});

export const {
  useGetAllCartShowQuery,
  useGetAllProductsQuery,
  useAddToCartMutation,
  useRemoveSingleCartMutation,
} = showcartlistApi;
