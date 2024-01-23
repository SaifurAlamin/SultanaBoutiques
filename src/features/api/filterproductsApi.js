// import { apiSlice } from "./apiSlice";

import { apiSlice } from "./apiSlice";

const filterproductsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFilterProducts: builder.query({
      query: ({
        mainId,
        subCatId,
        S,
        M,
        L,
        XL,
        min,
        max,
        findInputFieldData,
        highLow,
        brandId,
        rep,
        special,
        currentPage,
        count,
      }) => ({
        url: `home/multisearchproduct/${mainId || "null"}/${
          subCatId || "null"
        }/${S || M || L || XL || "null"}/${min}/${max}/${
          findInputFieldData || "null"
        }/${highLow === "1" ? "ASC" : "DESC"}/${brandId || "null"}/${
          rep !== "null" ? `${rep}` : "null"
        }/${special || "null"}/${currentPage}/${count}`,
      }),
      providesTags: ["multisectionData"],
    }),
  }),
});

export const { useGetFilterProductsQuery } = filterproductsApi;
