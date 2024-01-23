import { apiSlice } from "./apiSlice";

const searchfilterApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSearchFilterData: builder.query({
      query: (mainId, subId, size, min, max, inputData, AscDesc) => ({
        url: `/home/multisearchproduct/${mainId}/${subId}/${size}/${min}/${max}/${inputData}/${AscDesc}`,
      }),
      providesTags: ["home/multisearchproduct"],
    }),
  }),
});

export const { useGetAllSearchFilterDataQuery } = searchfilterApi;
