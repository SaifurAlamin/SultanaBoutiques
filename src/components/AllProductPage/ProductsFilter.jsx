import { useEffect, useState } from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import { useLocation, useParams } from "react-router-dom";
import { useGetAllCategoryQuery } from "../../features/api/categoryApi";
import Checkbox from "../Helpers/Checkbox";
export default function ProductsFilter({
  filters,
  checkboxHandler,
  volume,
  volumeHandler,
  storage,
  filterstorage,
  className,
  filterToggle,
  filterToggleHandler,
  handleBrand,
  count,
  startPage,
  subCatId,
  mainId,
  min,
  max,
  rep,
  setStorage,
  action,
  X,
  L,
  M,
  XL,
  S,
  special,
  setBrandId,
  brandId,
  filterProducts,
  currentPage,
}) {
  const { categoryId } = useParams();
  const [open, setOpen] = useState(0);
  const [color, setColor] = useState([]);

  const [brand, setBrand] = useState([]);
  console.log(filterProducts);

  const [spinner, setSpinner] = useState(false);

  const [isWalletVisible, setIsWalletVisible] = useState(0);

  const toggleWallet = (id) => {
    setIsWalletVisible(id);
  };
  const toggleWalletClose = () => {
    setIsWalletVisible(0);
  };

  // useEffect(() => {
  //   setSpinner(true);
  //   fetch("https://www.sultanaboutiques.com/backend/api/product/category")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setHabib(data);
  //       setSpinner(false); // Hide loading screen
  //     });
  // }, []);
  const { data: habib } = useGetAllCategoryQuery();
  // const {
  //   data: filterProducts,
  //   isLoading,
  //   isError,
  // } = useGetFilterProductsQuery({
  //   mainId,
  //   subCatId,
  //   S,
  //   M,
  //   L,
  //   XL,
  //   min,
  //   max,
  //   findInputFieldData,
  //   highLow,
  //   brandId,
  //   rep,
  //   special,
  //   currentPage,
  //   count,
  // });

  useEffect(() => {
    filterstorage("null");
    setBrandId("null");
    setSpinner(true);
    const url = `https://www.sultanaboutiques.com/backend/api/home/multisearchproduct/${
      mainId || "null"
    }/${subCatId || "null"}/${
      S || M || L || XL || "null"
    }/${min}/${max}/null/null/${brandId || "null"}/null/${
      special || "null"
    }/${currentPage}/${count}`;
    console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setColor(data?.products);
        setSpinner(false); // Hide loading screen
      });
  }, [
    mainId,
    subCatId,
    min,
    max,
    count,
    currentPage,
    XL,
    S,
    M,
    L,
    special,
    brandId,
  ]);
  const findColor = color?.map((item) => item?.color);

  const searchColor = findColor?.flatMap((item) => item.split(","));
  const finalColor = [...new Set(searchColor)];

  //  =================Size part ================

  // kkno single product dekano lagle ayta diye dekabu  **@Mayin dont't delete it
  const singleCatagory = habib?.find((c) => c.id == categoryId);

  // All brand fetch Api
  useEffect(() => {
    fetch("https://www.sultanaboutiques.com/backend/api/product/all/brand")
      .then((res) => res.json())
      .then((data) => setBrand(data));
  }, []);
  // for color sub menu and menu
  const location = useLocation();

  return (
    <>
      <div
        className={`filter-widget w-full fixed lg:relative left-0 top-0 h-screen z-10 lg:h-auto overflow-y-scroll lg:overflow-y-auto bg-white px-[30px] pt-[40px] ${
          className || ""
        }  ${filterToggle ? "block" : "hidden lg:block"}`}
      >
        <div className="filter-subject-item pb-2 border-b border-qgray-border">
          <div className="subject-title mb-[5px]">
            <h1 className="text-rose-500 text-base font-500">
              <i class="fa-solid fa-filter"></i> Filters
            </h1>
          </div>
          {/* <div className="flex justify-center mb-2 ">
            <ThreeCircles
              height="40"
              width="40"
              color="#004D40"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={spinner}
            />
          </div> */}
          {/* <div
            className={`nav-widget-wrapper w-full  h-[60px] relative z-30  ${className || ""
              }`}
          >
            <div className="container-x mx-auto h-full">
              <div className="w-full h-full relative">
                <div className="w-full h-full flex justify-between items-center">
                  <div className="category-and-nav flex xl:space-x-7 space-x-3 items-center">
                    <div className="category w-[150px] h-[40px] bg-white px-5 rounded-t-md mt-[6px] relative">
                      <button
                        onClick={handler}
                        type="button"
                        className="w-full h-full flex justify-between items-center"
                      >
                        <div className="flex space-x-1 items-center">

                          <span className="text-sm font-400 text-qblacktext">
                            Shirt
                          </span>

                        </div>
                        <div>
                          <Arrow
                            width="5.78538"
                            height="1.28564"
                            className="fill-current text-qblacktext"
                          />
                        </div>
                      </button>

                      {categoryToggle && (
                        <div
                          className="fixed top-0 left-0 w-full h-full -z-10"
                          onClick={handler}
                        ></div>
                      )}

                      <div
                        className="category-dropdown w-full absolute left-0 top-[53px] overflow-hidden"
                        style={{ height: `${elementsSize} ` }}
                      >
                        <ul className="categories-list">
                          <Link to="/all-products" >
                            <li className="category-item rounded">
                              <a href="#">
                                <div className=" flex justify-between items-center px-5 h-10 bg-white hover:bg-qh2-green transition-all duration-300 ease-in-out cursor-pointer text-qblack hover:text-white">
                                  <div className="flex items-center space-x-6">
                                    <span className="text-xs font-400">
                                      Test
                                    </span>
                                  </div>
                                  <div>
                                    <span>
                                      <svg
                                        className="fill-current"
                                        width="6"
                                        height="9"
                                        viewBox="0 0 6 9"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <rect
                                          x="1.49805"
                                          y="0.818359"
                                          width="5.78538"
                                          height="1.28564"
                                          transform="rotate(45 1.49805 0.818359)"
                                        />
                                        <rect
                                          x="5.58984"
                                          y="4.90918"
                                          width="5.78538"
                                          height="1.28564"
                                          transform="rotate(135 5.58984 4.90918)"
                                        />
                                      </svg>
                                    </span>
                                  </div>
                                </div>
                              </a>
                            </li>
                          </Link>
                          <Link to="/all-products" >
                            <li className="category-item rounded">
                              <a href="#">
                                <div className=" flex justify-between items-center px-5 h-10 bg-white hover:bg-qh2-green transition-all duration-300 ease-in-out cursor-pointer text-qblack hover:text-white">
                                  <div className="flex items-center space-x-6">
                                    <span className="text-xs font-400">
                                      Test
                                    </span>
                                  </div>
                                  <div>
                                    <span>
                                      <svg
                                        className="fill-current"
                                        width="6"
                                        height="9"
                                        viewBox="0 0 6 9"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <rect
                                          x="1.49805"
                                          y="0.818359"
                                          width="5.78538"
                                          height="1.28564"
                                          transform="rotate(45 1.49805 0.818359)"
                                        />
                                        <rect
                                          x="5.58984"
                                          y="4.90918"
                                          width="5.78538"
                                          height="1.28564"
                                          transform="rotate(135 5.58984 4.90918)"
                                        />
                                      </svg>
                                    </span>
                                  </div>
                                </div>
                              </a>
                            </li>
                          </Link>
                        </ul>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            </div>
          </div> */}

          {/* ========= Filter Category Option Paused by client er icche =============  */}
          {/* {singleCatagory?.id ? (
            <div>
              <div
                // className={`p-2 my-1 hover:bg-qh2-green hover:text-white cursor-pointer transition duration-75 ease-in-out rounded flex justify-between px-5 ${isWalletVisible ? 'bg-green-800 text-white' : ''}`}
                className={`p-2 my-1 hover:bg-qh2-green hover:text-white cursor-pointer transition duration-75 ease-in-out rounded flex justify-between px-5 ${
                  location.pathname === `/all-products/${singleCatagory.id}`
                    ? "bg-qh2-green text-white"
                    : ""
                } `}
              >
                <Link to={`/all-products/${singleCatagory.id}`}>
                  <div>{singleCatagory?.name}</div>
                </Link>
                <div>
                  {isWalletVisible === `${singleCatagory?.id}` ? (
                    <i
                      className="fa-solid fa-minus "
                      onClick={() => toggleWalletClose()}
                    />
                  ) : (
                    <i
                      className="fa-solid fa-plus "
                      onClick={() => toggleWallet(`${singleCatagory?.id}`)}
                    />
                  )}
                </div>
              </div>

              {isWalletVisible === `${singleCatagory?.id}` && (
                <ul className="ml-4">
                  {singleCatagory?.subcategory?.map((sub) => (
                    <Link
                      to={`/all-products/${categoryId ? categoryId : "null"}/${
                        sub.id
                      }`}
                    >
                      <li
                        className={`p-2 my-1 text-sm text-italic hover:bg-qh2-green hover:text-white cursor-pointer flex justify-between transition duration-75 ease-in-out rounded px-5  ${
                          location.pathname ===
                          `/all-products/${categoryId}/${sub?.id}`
                            ? "bg-qh2-green text-white"
                            : ""
                        } `}
                      >
                        {sub?.name}
                        <i className="fa-solid fa-angle-right  " />
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <div>
              {habib?.map((caterogy) => (
                <div>
                  <div
                    key={caterogy.id}
                    // className={`p-2 my-1 hover:bg-qh2-green hover:text-white cursor-pointer transition duration-75 ease-in-out rounded flex justify-between px-5 ${isWalletVisible ? 'bg-green-800 text-white' : ''}`}
                    className={`p-2 my-1 hover:bg-qh2-green hover:text-white cursor-pointer transition duration-75 ease-in-out rounded flex justify-between px-5 ${
                      location.pathname === `/all-products/${caterogy.id}`
                        ? "bg-qh2-green"
                        : ""
                    } `}
                  >
                    <Link to={`/all-products/${caterogy.id}`}>
                      <div>{caterogy?.name}</div>
                    </Link>
                    <div>
                      {isWalletVisible === `${caterogy?.id}` ? (
                        <i
                          className="fa-solid fa-minus "
                          onClick={() => toggleWalletClose()}
                        />
                      ) : (
                        <i
                          className="fa-solid fa-plus "
                          onClick={() => toggleWallet(`${caterogy?.id}`)}
                        />
                      )}
                    </div>
                  </div>

                  {isWalletVisible === `${caterogy?.id}` && (
                    <ul className="ml-4">
                      {caterogy?.subcategory?.map((sub) => (
                        <Link
                          to={`/all-products/${
                            categoryId ? categoryId : "null"
                          }/${sub.id}`}
                        >
                          <li
                            className={`p-2 my-1 text-sm text-italic hover:bg-qh2-green hover:text-white cursor-pointer flex justify-between transition duration-75 ease-in-out rounded px-5  ${
                              location.pathname ===
                              `/all-products/${categoryId}/${sub?.id}`
                                ? "bg-qh2-green text-white"
                                : ""
                            } `}
                          >
                            {sub?.name}
                            <i className="fa-solid fa-angle-right  " />
                          </li>
                        </Link>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )} */}
        </div>

        <div className="filter-subject-item pb-10 border-b border-qgray-border mt-2">
          <div className="subject-title mb-[30px]">
            <h1 className="text-black text-base font-500">Price Range</h1>
          </div>
          <div className="price-range mb-5">
            <InputRange
              draggableTrack
              maxValue={100}
              minValue={1}
              value={volume}
              onChange={volumeHandler}
              // onChange={(e) => priceChnage(e.target.value)}
            />
          </div>
          <p className="text-xs text-qblack font-400">
            Pricee: €{volume.min} - €{volume.max}
          </p>
        </div>
        <div
          className="filter-subject-item pb-10 border-b border-qgray-border mt-6"
          onClick={filterToggleHandler}
        >
          <div className="subject-title mb-[30px]">
            <h1 className="text-black text-base font-500">Brands</h1>
          </div>
          <div className="filter-items">
            <ul>
              {brand?.map((item, i) => (
                <li
                  key={item?.id}
                  className="item flex justify-between items-center mb-5"
                >
                  <div className="flex space-x-[14px] items-center">
                    <div>
                      <input
                        type="checkbox"
                        id={item?.id}
                        name={item?.name}
                        // handleChange={(e) => checkboxHandler(e)}
                        onClick={() => handleBrand(item?.id, i)}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={item?.id}
                        className="text-xs font-black font-400 capitalize"
                      >
                        {item?.name}
                      </label>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="filter-subject-item pb-10 border-b border-qgray-border mt-6">
          <div className="subject-title mb-[30px]">
            <h1 className="text-black text-base font-500">Color</h1>
          </div>
          <div className="filter-items">
            <div
              className="flex space-x-[10px] justify-center items-center flex-wrap"
              onClick={filterToggleHandler}
            >
              {finalColor?.map((c, i) => (
                <span
                  key={i}
                  onClick={() => filterstorage(c)}
                  style={{ background: c, margin: "5px" }}
                  className={`w-[20px] h-[20px] block rounded-full border ${
                    storage === c
                      ? "w-[24px] md:w-[32px] h-[12px] md:h-[32px] rounded-full block border-1 border-gray-900"
                      : ""
                  }`}
                  // className={` font-400 border border-qgray-border text-xs px-[14px] py-[6px] cursor-pointer mb-[5px] ${
                  //   storage === "64GB"
                  //     ? "bg-qyellow text-qblack border-none"
                  //     : " text-qgray "
                  // }`}
                ></span>
              ))}
            </div>
          </div>
        </div>
        <div
          className="filter-subject-item pb-10 mt-6"
          onClick={filterToggleHandler}
        >
          <div className="subject-title mb-[30px]">
            <h1 className="text-black text-base font-500">Sizes</h1>
          </div>
          <div className="filter-items">
            <ul>
              <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div>
                    <Checkbox
                      id="sizeS"
                      name="sizeS"
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.sizeS}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="sizeS"
                      className="text-xs font-black font-400 capitalize"
                    >
                      s
                    </label>
                  </div>
                </div>
              </li>
              <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div>
                    <Checkbox
                      id="sizeM"
                      name="sizeM"
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.sizeM}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="sizeM"
                      className="text-xs font-black font-400 capitalize"
                    >
                      M
                    </label>
                  </div>
                </div>
              </li>
              <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div>
                    <Checkbox
                      id="sizeL"
                      name="sizeL"
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.sizeL}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="sizeM"
                      className="text-xs font-black font-400 capitalize"
                    >
                      L
                    </label>
                  </div>
                </div>
              </li>
              <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div>
                    <Checkbox
                      id="sizeXL"
                      name="sizeXL"
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.sizeXL}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="sizeXL"
                      className="text-xs font-black font-400 capitalize"
                    >
                      XL
                    </label>
                  </div>
                </div>
              </li>
              <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div>
                    <Checkbox
                      id="sizeXXL"
                      name="sizeXXL"
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.sizeXXL}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="sizeXXL"
                      className="text-xs font-black font-400 capitalize"
                    >
                      XXL
                    </label>
                  </div>
                </div>
              </li>
              <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div>
                    <Checkbox
                      id="sizeFit"
                      name="sizeFit"
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.sizeFit}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="sizeFit"
                      className="text-xs font-black font-400 capitalize"
                    >
                      Sliem Fit
                    </label>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <button
          onClick={filterToggleHandler}
          type="button"
          className="w-10 h-10 fixed top-5 right-5 z-50 rounded  lg:hidden flex justify-center items-center border border-qred text-qred"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
