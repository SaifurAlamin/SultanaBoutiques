import { useState } from "react";
import "react-input-range/lib/css/index.css";
import { Link, useLocation, useParams } from "react-router-dom";
import productDatas from "../../data/products.json";
import { useGetFilterProductsQuery } from "../../features/api/filterproductsApi";
import BreadcrumbCom from "../BreadcrumbCom";
import ProductCardStyleOne from "../Helpers/Cards/ProductCardStyleOne";
import DataIteration from "../Helpers/DataIteration";
import Layout from "../Partials/LayoutHomeTwo";
import ProductsFilter from "./ProductsFilter";

const filterObj = {
  mobileLaptop: false,
  gaming: false,
  imageVideo: false,
  vehicles: false,
  furnitures: false,
  sport: false,
  foodDrinks: false,
  fashion: false,
  toilet: false,
  makeupCorner: false,
  babyItem: false,
  apple: false,
  samsung: false,
  walton: false,
  oneplus: false,
  vivo: false,
  oppo: false,
  xiomi: false,
  others: false,
  sizeS: false,
  sizeM: false,
  sizeL: false,
  sizeXL: false,
  sizeXXL: false,
  sizeFit: false,
};

export default function AllProductPage() {
  const { categoryId, subId, viewMore } = useParams();
  console.log(categoryId);
  const [filters, setFilter] = useState({});

  const { sizeM, sizeS, sizeXL, sizeL, sizeXXl } = filters;

  // const [filterProducts, setfilterProducts] = useState([]);
  // console.log(filterProducts);
  const [highLow, setHighLow] = useState("1");
  const [select, setSelect] = useState(0);
  const [brandId, setBrandId] = useState("null");
  //location for search data
  const location = useLocation();
  console.log(location.pathname);
  // const viewMoreProducts = location.state;
  // console.log(viewMoreProducts);

  const findInputFieldData = location?.state?.searchInput;

  const checkboxHandler = (e) => {
    const { name } = e.target;
    setFilter((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const handleBrand = (id, i) => {
    setBrandId(id);
    setSelect(i);
  };
  const [volume, setVolume] = useState({ min: 1, max: 100 });
  const { min, max } = volume;

  const [storage, setStorage] = useState("#null");
  console.log(storage);
  const filterStorage = (value) => {
    setStorage(value);
  };

  const rep = storage.replace(/#/g, ""); //ayta hoilo color code er aghe j hash(#) ashe ota baad deyar jnno

  const [filterToggle, setToggle] = useState(false);
  const [spinner, setSpinner] = useState(true);

  const { products } = productDatas;
  const [Habib, setHabib] = useState([]);

  const mainId = categoryId;
  const subCatId = subId;
  const special = viewMore;

  const S = sizeS ? "s".toLocaleLowerCase() : "";
  const M = sizeM ? "m".toLocaleLowerCase() : "";
  const L = sizeL ? "l".toLocaleLowerCase() : "";
  const XL = sizeXL ? "xl".toLocaleLowerCase() : "";
  const [currentPage, setCurrentPage] = useState(1);
  // const [count, setCount] = useState(20);
  const [startPage, setStartPage] = useState(1);
  console.log(startPage);

  //Final Filter
  // useEffect(() => {
  //   setSpinner(true);
  //   const fetchUrl = `https://www.sultanaboutiques.com/backend/api/home/multisearchproduct/null/null/null/0/2000/null/null/null/null/null/1/20`;

  //   console.log("finalUrl", fetchUrl);
  //   fetch(fetchUrl)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data?.pagination);
  //       setSpinner(false); // Hide loading screen
  //     });
  // }, [
  //   mainId,
  //   subCatId,
  //   S,
  //   M,
  //   L,
  //   XL,
  //   min,
  //   max,
  //   location,
  //   findInputFieldData,
  //   highLow,
  //   storage,
  //   brandId,
  //   special,
  // ]);

  const [count, setCount] = useState(20);
  console.log(count);
  const {
    data: filterProducts,
    isLoading,
    isError,
  } = useGetFilterProductsQuery({
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
  });

  console.log(filterProducts?.pagination);
  // useEffect(() => {
  //   if (!isLoading && !isError && filterProducts && filterProducts.products) {
  //     setCount(filterProducts.products.length);
  //   }
  // }, [filterProducts, isLoading, isError]);

  // Pgination
  const handlePageChange = (page) => {
    if (page > startPage + 2 && page < filterProducts?.pagination?.last_page) {
      setStartPage(page - 1);
    } else if (page < startPage && startPage > 1) {
      setStartPage(startPage - 1);
    }

    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
    const buttons = [];

    buttons.push(
      <button
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <i
          class="fa-solid fa-angles-left cursor-pointer mr-1 text-qgray text-xs
        "
        ></i>
      </button>
    );
    for (
      let i = startPage;
      i <= Math.min(startPage + 2, +filterProducts?.pagination?.last_page);
      i++
    ) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`${
            i === currentPage
              ? "bg-blue-500 text-white shadow w-8 h-6 rounded"
              : "shadow w-8 h-6 rounded "
          } `}
        >
          {i}
        </button>
      );
    }

    if (filterProducts?.pagination?.last_page > 3) {
      buttons.push(
        <span>
          <small className="text-qgray mr-1">......</small>
          <button
            title="Last page"
            className={`${
              filterProducts?.pagination?.last_page === currentPage
                ? "bg-blue-500 text-white shadow w-8 h-6 rounded"
                : "shadow w-8 h-6 rounded "
            } `}
            onClick={() =>
              handlePageChange(
                Math.min(filterProducts?.pagination?.last_page, currentPage + 1)
              )
            }
          >{`${filterProducts?.pagination?.last_page}`}</button>
        </span>
      );
    }
    if (startPage + 2 < filterProducts?.pagination?.last_page) {
      buttons.push(
        <button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === filterProducts?.pagination?.last_page}
        >
          <i
            class={`fa-solid fa-angles-right cursor-pointer ml-1 text-qgray text-xs`}
          ></i>
        </button>
      );
    }

    return buttons;
  };

  // filter for all products
  const filterPiceForFind = filterProducts?.products?.filter(
    (p) => +p.current_purchase_cost > min && +p.current_purchase_cost < max
  );

  return (
    <>
      <Layout>
        <div className="products-page-wrapper w-full">
          <div className="container-x mx-auto">
            <div className="flex justify-between">
              <BreadcrumbCom
                paths={[
                  { name: "home", path: "/" },
                  { name: "All Products", path: "/all-products" },
                ]}
              />
              <Link to="/all-products">
                <button className="text-rose-600">Refresh</button>
              </Link>
            </div>
            <div className="w-full lg:flex lg:space-x-[30px]">
              <div className="lg:w-[270px]">
                <ProductsFilter
                  filterToggle={filterToggle}
                  filterToggleHandler={() => setToggle(!filterToggle)}
                  filters={filters}
                  checkboxHandler={checkboxHandler}
                  volume={volume}
                  volumeHandler={(value) => setVolume(value)}
                  storage={storage}
                  filterstorage={filterStorage}
                  className="mb-[30px]"
                  handleBrand={handleBrand}
                  count={count}
                  startPage={startPage}
                  mainId={mainId}
                  subCatId={subCatId}
                  min={min}
                  max={max}
                  rep={rep}
                  setStorage={setStorage}
                />
                {/* ads */}
                <div className="w-full hidden lg:block h-[295px]">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/images/ads-5.png`}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div className="flex-1">
                <div className="products-sorting w-full bg-white md:h-[70px] flex md:flex-row flex-col md:space-y-0 space-y-5 md:justify-between md:items-center p-[30px] mb-[40px]">
                  <div>
                    <p className="font-400 text-[13px]">
                      <span className="text-rose-500 font-semibold">
                        {" "}
                        {filterProducts?.products?.length}
                      </span>{" "}
                      found for{" "}
                      {findInputFieldData ? `"${findInputFieldData}"` : "it."}
                    </p>
                    {/* <p className="font-400 text-[13px]">
                      <span className="text-qgray"> Showing</span> 1–16 of 66
                    </p> */}
                  </div>
                  <div className=" flex justify-between items-center ">
                    <div className="flex space-x-3 items-center card">
                      <span className="font-400 text-[13px] lg:text-[18px]">
                        Sort by:
                      </span>
                      <div className="flex items-center border-none lg:border">
                        <select
                          onClick={(e) => setHighLow(e.target.value)}
                          className="text-[13px] lg:text-[15px] border-none  rounded-none focus:border-none mx-auto"
                          required
                        >
                          <option
                            className="text-slate-500 shadow-lg p-5 text-[13px] lg:text-[15px]"
                            value={1}
                          >
                            Low to high
                          </option>
                          <option
                            className="text-slate-500 text-[13px] lg:text-[15px]"
                            value={2}
                          >
                            High to low
                          </option>
                        </select>
                      </div>
                    </div>
                    {/* filter Button paused by client er icche  */}

                    {/* <button
                      onClick={() => setToggle(!filterToggle)}
                      type="button"
                      className="w-10 lg:hidden h-10 rounded flex justify-center items-center border border-rose-600 text-rose-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                        />
                      </svg>
                    </button> */}
                    <p
                      className=" px-1 lg:hidden  flex justify-center items-center  cursor-pointer text-[15px] rounded  text-rose-600"
                      onClick={() => setToggle(!filterToggle)}
                    >
                      <i class="fa-solid fa-filter mr-1"></i> Filters
                    </p>
                  </div>
                </div>
                {/* <div className="flex justify-center mb-2 ">
                  <ThreeCircles
                    height="80"
                    width="80"
                    color="#004D40"
                    ariaLabel="circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={spinner}
                  />
                </div> */}
                {isLoading ? (
                  <div className="flex justify-center mb-2 ">
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        class="inline w-8 h-8 lg:w-10 lg:h-10 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1  xl:gap-[30px] gap-5 mb-[40px]">
                    <DataIteration
                      datas={filterProducts?.products}
                      startLength={0}
                      endLength={500}
                    >
                      {({ datas }) => (
                        <div data-aos="fade-up" key={datas.id}>
                          <ProductCardStyleOne
                            datas={datas}
                            filtersProducts={filterProducts?.products}
                          />
                        </div>
                      )}
                    </DataIteration>
                  </div>
                )}

                {/* <div className="w-full h-[164px] overflow-hidden mb-[40px]">
                  <picture>
                    <source
                      media=""
                      srcSet={`https://sultanaboutiques.com/backend/storage/banner_images/banner_images-16968818073737.jpg`}
                    />
                    <img
                      src={`https://sultanaboutiques.com/backend/storage/banner_images/banner_images-16968818073737.jpg`}
                      alt=""
                      className="w-full rounded max-w-full h-[300px]"
                    />
                  </picture>
                </div> */}

                {/* //for pagination */}

                {filterProducts?.products?.length !== 0 ? (
                  <div className="flex justify-between items-center ">
                    <div className="flex space-x-1 items-center">
                      <span className=" text-[10px] lg:text-[13px]">Show</span>
                      <div className="flex items-center lg:border">
                        <select
                          onChange={(e) => setCount(e.target.value)}
                          className="text-[13px] lg:text-[15px] border-none  rounded-none focus:border-none mx-auto"
                        >
                          <option
                            selected
                            className="text-slate-500 shadow-lg p-5 text-[13px] lg:text-[15px]"
                            value={20}
                          >
                            20
                          </option>
                          <option
                            className="text-slate-500 text-[13px] lg:text-[15px]"
                            value={50}
                          >
                            50
                          </option>

                          <option
                            className="text-slate-500 text-[13px] lg:text-[15px]"
                            value={100}
                          >
                            100
                          </option>

                          <option
                            className="text-slate-500 text-[13px] lg:text-[15px]"
                            value={500}
                          >
                            500
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-evenly items-center rou gap-x-1">
                      <div>{renderPaginationButtons()}</div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {/* <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5 mb-[40px]">
                  <DataIteration
                    datas={filterProducts?.products}
                    startLength={21}
                    endLength={75}
                  >
                    {({ datas }) => (
                      <div data-aos="fade-up" key={datas.id}>
                        <ProductCardStyleOne
                          datas={datas}
                          filtersProducts={filterProducts?.products}
                        />
                      </div>
                    )}
                  </DataIteration>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
