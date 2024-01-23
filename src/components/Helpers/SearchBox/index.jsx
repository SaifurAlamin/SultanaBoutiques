import { Autocomplete, createFilterOptions, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SearchBox({ className, type }) {
  const [Habib, setHabib] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const filterOptions = createFilterOptions({
    matchFrom: "",
    stringify: (option) => option,
  });

  useEffect(() => {
    fetch("https://www.sultanaboutiques.com/backend/api/home/all-product")
      .then((res) => res.json())
      .then((data) => setHabib(data?.products));
  }, []);

  const searchProduct = Habib.filter((p) =>
    p.keyword?.toLowerCase().includes(searchInput.toLowerCase())
  );

  const finalSearch = searchProduct?.map((item) => item?.keyword);
  const mapSearchProduct = finalSearch?.flatMap((item) => item.split(","));
  const searchOutput = [...new Set(mapSearchProduct)];

  const forAllProducts = {
    searchProduct,
    searchInput,
  };

  return (
    <>
      <div
        className={`w-full h-full flex items-center  border border-qgray-border bg-white ${
          className || ""
        }`}
      >
        <div className="flex-1 h-full">
          <form action="#" className="h-full">
            <Autocomplete
              size="small"
              freeSolo
              options={searchInput ? searchOutput : []}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  className="rounded-[0px]"
                  size="small"
                  {...params}
                  variant="outlined"
                  placeholder="Search"
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              )}
            />
          </form>
        </div>
        <div className="w-[1px] h-[22px] bg-qgray-border"></div>
        <Link to="/all-products" state={forAllProducts}>
          <button
            className={` w-[48px] rounded  bg-rose-600 text-white h-[42px] 'search-btn'}`}
            type="button"
          >
            <i className="fa-solid fa-magnifying-glass text-2xl"></i>
          </button>
        </Link>
      </div>
    </>
  );
}
