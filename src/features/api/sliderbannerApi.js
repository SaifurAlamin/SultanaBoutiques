import { apiSlice } from "./apiSlice";

const sliderbannerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSliderApi: builder.query({
      query: (userId) => ({
        url: `/slider/list`,
      }),
      providesTags: ["sliderList"],
    }),
  }),
});

export const { useGetSliderApiQuery } = sliderbannerApi;
