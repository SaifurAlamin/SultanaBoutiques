import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetAllCategoryQuery } from "../../../../features/api/categoryApi";
import { useGetAllCartShowQuery } from "../../../../features/api/showcartlistApi";
import { useGetAllWishListQuery } from "../../../../features/api/wishlistApi";
import Cart from "../../../Cart";
import SearchBox from "../../../Helpers/SearchBox";
import Arrow from "../../../Helpers/icons/Arrow";
import ThinBag from "../../../Helpers/icons/ThinBag";
import ThinLove from "../../../Helpers/icons/ThinLove";
import ThinPeople from "../../../Helpers/icons/ThinPeople";
export default function Navbar({ className }) {
  const [categoryToggle, setToggle] = useState(false);
  const [elementsSize, setSize] = useState("0px");
  const [headingData, setHeaderData] = useState({});
  console.log(headingData);
  // const getItems = document.querySelectorAll(`.categories-list li`).length;
  // if (categoryToggle && getItems > 0) {
  //   setSize(`${40 * getItems}px`);
  // }

  const userProfile = JSON.parse(localStorage.getItem("user"));
  const userdata = userProfile?.user;
  const googleUser = JSON.parse(localStorage.getItem("googleUser"));
  const googleUserId = googleUser?.user?.id;

  useEffect(() => {
    fetch("https://www.sultanaboutiques.com/backend/api/product/company/info")
      .then((res) => res.json())
      .then((data) => {
        setHeaderData(data);
      });
  }, []);

  // Count For Cartlisgt
  const customer_ip = JSON.parse(localStorage.getItem("user_ip"));
  const userIP = customer_ip?.user_ip;

  const { data: cartData } = useGetAllCartShowQuery(userIP);
  const cartList = cartData;

  // Count For WishList
  const { data, error, isLoading } = useGetAllWishListQuery(
    userdata?.id ? userdata?.id : googleUserId
  );

  const handler = () => {
    setToggle(!categoryToggle);
  };
  useEffect(() => {
    if (categoryToggle) {
      const getItems = document.querySelectorAll(`.categories-list li`).length;
      if (categoryToggle && getItems > 0) {
        setSize(`${42 * getItems}px`);
      }
    } else {
      setSize(`0px`);
    }
  }, [categoryToggle]);

  const { data: category } = useGetAllCategoryQuery();

  // localStorage.setItem("category", JSON.stringify(category));

  // Log Out
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("googleUser");
    localStorage.removeItem("access_token");
    navigate("/");
  };

  const [selectId, setSelectId] = useState(null);
  const handleShow = (id) => {
    setSelectId(id);
  };
  return (
    <div
      className={`nav-widget-wrapper w-full bg-white text-dark h-[60px] relative z-30  ${
        className || ""
      }`}
    >
      <div className="container-x mx-auto h-full">
        <div className="w-full h-full relative">
          <div className="w-full h-full flex justify-between items-center justify-items-center">
            <div className="category-and-nav flex xl:space-x-4 space-x-2 items-center">
              <div className="mb-4 mt-2">
                <Link to="/">
                  <img
                    width="102"
                    height="26"
                    src={`https://sultanaboutiques.com/backend/storage/company_logo/company_logo-17037546399752.png`}
                    alt="logo"
                  />
                </Link>
              </div>
              <div className="nav">
                <ul className="nav-wrapper mb-2 flex xl:space-x-4 space-x-2">
                  <li className="relative">
                    <Link to="/">
                      <span className="flex items-center text-md text-dark font-600 cursor-pointer ">
                        <span className="text-gray-500 border-b border-transparent hover:border-gray-900 hover:text-gray-800">
                          Home
                        </span>
                      </span>
                    </Link>
                  </li>
                  {category?.slice(0, 4).map((item) => (
                    <li className="relative" key={item?.id}>
                      <span className="flex items-center text-md text-dark font-600 cursor-pointer ">
                        <span className="text-gray-500 border-b border-transparent hover:border-gray-900 hover:text-gray-800">
                          {item?.name}
                        </span>

                        <span className="ml-1 text-gray-500 border-b border-transparent hover:border-gray-900 hover:text-gray-800 ">
                          <Arrow className="fill-current" />
                        </span>
                      </span>
                      <div className="sub-menu w-[120px] absolute left-0 top-[60px]">
                        <div
                          className="w-full bg-white flex justify-between items-center "
                          style={{
                            boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.14)",
                          }}
                        >
                          <div className="categories-wrapper w-full h-full p-5">
                            <div>
                              <div className="category-items">
                                <ul className="flex flex-col space-y-2">
                                  {item?.subcategory?.map((subItem) => (
                                    <li key={subItem?.id}>
                                      <Link
                                        to={`/all-products/${item?.id}/${subItem?.id}`}
                                      >
                                        <span className="text-gray-500 text-sm font-400  border-b border-transparent hover:border-gray-900 hover:text-gray-900">
                                          {subItem?.name}
                                        </span>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}

                  <li className="relative">
                    <span className="flex items-center text-md text-dark font-600 cursor-pointer">
                      <span className="text-gray-500 border-b border-transparent hover:border-gray-900 hover:text-gray-800">
                        Others
                      </span>
                      <span className="ml-1 text-gray-500 border-b border-transparent hover:border-gray-900 hover:text-gray-800">
                        <Arrow className="fill-current" />
                      </span>
                    </span>
                    <div className="sub-menu w-[120px] absolute left-0 top-[60px]">
                      <div
                        className="w-full bg-white flex justify-between items-center "
                        style={{
                          boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.14)",
                        }}
                      >
                        <div className="categories-wrapper w-full h-full p-5">
                          <div>
                            <div className="category-items">
                              <ul className="flex flex-col space-y-2">
                                {category?.slice(4, 10)?.map((item, i) => (
                                  <li key={item?.id}>
                                    <span
                                      className="flex items-center text-md text-dark font-600 cursor-pointer"
                                      onClick={() => handleShow(item?.id)}
                                    >
                                      <span className="text-gray-500 text-sm border-b border-transparent hover:border-gray-900 hover:text-gray-800">
                                        {item?.name}
                                      </span>
                                      <span className="ml-1 text-gray-500 border-b border-transparent hover:border-gray-900 hover:text-gray-800">
                                        <Arrow className="fill-current" />
                                      </span>
                                    </span>
                                    {/* Submenu for each item */}

                                    {selectId === item.id && (
                                      <ul className="submenu">
                                        {item?.subcategory?.map((subItem) => (
                                          <li key={subItem.id}>
                                            <Link
                                              to={`/all-products/${item?.id}/${subItem?.id}`}
                                            >
                                              <span className="text-gray-500 text-xs font-400  border-b border-transparent hover:border-gray-900 hover:text-gray-900">
                                                {subItem?.name}
                                              </span>
                                            </Link>
                                          </li>
                                        ))}

                                        {/* Add more submenu items here */}
                                      </ul>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li className="relative">
                    <span className="flex items-center text-md text-dark font-600 cursor-pointer ">
                      <span className="text-gray-500 border-b border-transparent hover:border-gray-900 hover:text-gray-800">
                        About
                      </span>
                      <span className="ml-1 text-gray-500">
                        <Arrow className="fill-current" />
                      </span>
                    </span>
                    <div className="sub-menu w-[170px] absolute left-0 top-[60px]">
                      <div
                        className="w-full bg-white flex justify-between items-center "
                        style={{
                          boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.14)",
                        }}
                      >
                        <div className="categories-wrapper w-full h-full p-5">
                          <div>
                            <div className="category-items">
                              <ul className="flex flex-col space-y-2">
                                <li>
                                  <Link to="/about">
                                    <span className="text-gray-500 text-sm font-400  border-b border-transparent hover:border-gray-900 hover:text-gray-900">
                                      About us
                                    </span>
                                  </Link>
                                </li>
                                <li>
                                  <Link to="/contact">
                                    <span className="text-gray-500 text-sm font-400  border-b border-transparent hover:border-gray-900 hover:text-gray-900">
                                      Contact us
                                    </span>
                                  </Link>
                                </li>
                                <li>
                                  <Link to="/faq">
                                    <span className="text-gray-500 text-sm font-400  border-b border-transparent hover:border-gray-900 hover:text-gray-900">
                                      FAQ
                                    </span>
                                  </Link>
                                </li>
                                <li>
                                  <Link to="/privacy-policy">
                                    <span className="text-gray-500 text-sm font-400  border-b border-transparent hover:border-gray-900 hover:text-gray-900">
                                      Privacy Policy
                                    </span>
                                  </Link>
                                </li>
                                {/* <li>
                                  <Link to="/terms-conditions">
                                    <span className="text-gray-500 text-sm font-400  border-b border-transparent hover:border-gray-900 hover:text-gray-900">
                                      Terms and conditions
                                    </span>
                                  </Link>
                                </li> */}
                                <li>
                                  <Link to="/refundpolicy">
                                    <span className="text-gray-500 text-sm font-400  border-b border-transparent hover:border-gray-900 hover:text-gray-900">
                                      Refund Policy
                                    </span>
                                  </Link>
                                </li>
                                <li>
                                  <Link to="/size-guide">
                                    <span className="text-gray-500 text-sm font-400  border-b border-transparent hover:border-gray-900 hover:text-gray-900">
                                      Size Guide
                                    </span>
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="become-seller-btn  w-[380px] mb-3 h-[40px]">
              <div className="flex space-x-6 items-center">
                <div className="favourite relative ">
                  {!userdata?.id && !googleUser?.user?.id ? (
                    <Link to="/login">
                      <span className="flex w-10 text-xs font-semibold border-b border-transparent hover:border-gray-900 ">
                        Sign In
                      </span>
                    </Link>
                  ) : (
                    <button onClick={handleLogout}>
                      <span className="flex w-12 text-xs font-semibold border-b border-transparent hover:border-qred hover:text-qred">
                        Log Out
                      </span>
                    </button>
                  )}
                </div>
                <div>
                  <Link to="/profile">
                    <span title="Profile">
                      <ThinPeople />
                    </span>
                  </Link>
                </div>
                <div className="cart-wrapper group relative py-4">
                  <div className="cart relative cursor-pointer">
                    <Link to="/cart">
                      <span>
                        <ThinBag />
                      </span>
                    </Link>
                    <span className="w-[18px] h-[18px] rounded-full bg-rose-600 absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] text-white">
                      {cartList?.length}
                    </span>
                  </div>
                  {/* <div className="fixed left-0 top-0 w-full h-full z-40"></div> */}
                  {/* hidden group-hover:block" */}
                  <Cart className="absolute -right-[45px] top-11 z-50 hidden group-hover:block" />
                </div>
                <div className="favorite relative">
                  <Link to="/wishlist">
                    <span>
                      <ThinLove />
                    </span>
                  </Link>
                  <span className="w-[18px] h-[18px] rounded-full bg-rose-600 absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] text-white">
                    {data?.length}
                  </span>
                </div>
                <div className="w-[200px] h-[42px]">
                  <SearchBox className="search-com" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
