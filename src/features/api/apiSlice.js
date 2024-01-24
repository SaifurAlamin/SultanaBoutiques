import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.sultanaboutiques.com/backend/api/",
  }),
  tagTypes: [
    "show_cartlist",
    "home/all-product",
    "home/multisearchproduct",
    "show_wishlist",
    "home/single-category-all-products",
    "product/category",
    "home/popular/product/get",
    "home/productDetails",
    "product/company/info",
  ],
  endpoints: (builder) => ({}),
});
