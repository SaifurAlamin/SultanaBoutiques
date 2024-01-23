import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import datas from "../../../data/products.json";
import BreadcrumbCom from "../../BreadcrumbCom";
import Layout from "../../Partials/LayoutHomeTwo";
import IcoCart from "./icons/IcoCart";
import IcoDashboard from "./icons/IcoDashboard";
import IcoLogout from "./icons/IcoLogout";
import IcoLove from "./icons/IcoLove";
import IcoPassword from "./icons/IcoPassword";
import IcoPeople from "./icons/IcoPeople";
import AddressesTab from "./tabs/AddressesTab";
import CheckoutOrderdetails from "./tabs/CheckoutOrderdetails";
import Dashboard from "./tabs/Dashboard";
import ReviewTab from "./tabs/OrderDetailsTab";
import OrderTab from "./tabs/OrderTab";
import PasswordTab from "./tabs/PasswordTab";
import Payment from "./tabs/Payment";
import ProfileTab from "./tabs/ProfileTab";
import SupportTab from "./tabs/SupportTab";
import WishlistTab from "./tabs/WishlistTab";

export default function Profile(drawerAction) {
  const [switchDashboard, setSwitchDashboard] = useState(false);
  const location = useLocation();
  const getHashContent = location.hash.split("#");
  const [active, setActive] = useState("dashboard");
  const userProfile = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("googleUser");
    localStorage.removeItem("access_token");
    navigate("/");
  };
  useEffect(() => {
    setActive(
      getHashContent && getHashContent.length > 1
        ? getHashContent[1]
        : "dashboard"
    );
  }, [getHashContent]);
  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="profile-page-wrapper w-full">
        {/* ============//For Mobile============== */}
        <div className="lg:hidden container mx-auto px-4 mt-4">
          <div className="  border-none lg:border-r border-[rgba(0, 0, 0, 0.1)]">
            <div className="flex justify-center gap-8 mb-4">
              <div className="item group">
                <Link to="/profile#dashboard">
                  <div className="flex  items-center text-gray-600 hover:text-gray-900">
                    <span className=" text-rose-500" title="Dashboard">
                      <IcoDashboard />
                    </span>
                  </div>
                </Link>
              </div>
              <div className="item group">
                <Link to="/profile#profile">
                  <div className="flex space-x-1 lg:space-x-3 items-center text-gray-600 hover:text-gray-900">
                    <span className="text-rose-500" title="Update profile">
                      <IcoPeople />
                    </span>
                  </div>
                </Link>
              </div>

              {/* <div className="item group">
                      <Link to="/profile#payment">
                        <div className="flex space-x-1 lg:space-x-3 items-center text-gray-600 hover:text-gray-900">
                          <span>
                            <IcoPayment />
                          </span>
                          <span className="  font-semibold text-sm lg:text-base">
                            Payment Method
                          </span>
                        </div>
                      </Link>
                    </div> */}
              <div className="item group">
                <Link to="/profile#order">
                  <div className="flex space-x-1 lg:space-x-3 items-center text-gray-600 hover:text-gray-900">
                    <span className="text-rose-500" title="Order list">
                      <IcoCart />
                    </span>
                  </div>
                </Link>
              </div>
              {/* <div className="item group">
                      <Link to="/profile#review">
                        <div className="flex space-x-1 lg:space-x-3 items-center text-gray-600 hover:text-gray-900">
                          <span>
                            <IcoCart />
                          </span>
                          <span className="  font-semibold text-sm lg:text-base">Order details</span>
                        </div>
                      </Link>
                    </div> */}
              {/* 
              <div className="item group">
                <Link to="/profile#wishlist">
                  <div className="flex space-x-1 lg:space-x-3 items-center text-gray-600 hover:text-gray-900">
                    <span className="text-rose-500">
                      <IcoLove />
                    </span>
                  </div>
                </Link>
              </div> */}

              {/* =========Postponded Address Menu  ==================*/}

              {/* <div className="item group">
                      <Link to="/profile#address">
                        <div className="flex space-x-1 lg:space-x-3 items-center text-gray-600 hover:text-gray-900">
                          <span>
                            <IcoAdress />
                          </span>
                          <span className="  font-semibold text-sm lg:text-base">
                            Address
                          </span>
                        </div>
                      </Link>
                    </div> */}
              {/* <div className="item group">
                      <Link to="/profile#review">
                        <div className="flex space-x-1 lg:space-x-3 items-center text-gray-600 hover:text-gray-900">
                          <span>
                            <IcoReviewHand />
                          </span>
                          <span className="  font-semibold text-sm lg:text-base">
                            Reviews
                          </span>
                        </div>
                      </Link>
                    </div> */}

              {/* ====Password change ==== */}

              {/* <div className="item group">
                <Link to="/profile#password">
                  <div className="flex space-x-1 lg:space-x-3 items-center text-gray-600 hover:text-gray-900">
                    <span className="text-rose-500" title="Change Password">
                      <IcoPassword />
                    </span>
                  </div>
                </Link>
              </div> */}
              {/* <div className="item group">
                      <Link to="/profile#support">
                        <div className="flex space-x-1 lg:space-x-3 items-center text-gray-600 hover:text-gray-900">
                          <span>
                            <IcoSupport />
                          </span>
                          <span className="  font-semibold text-sm lg:text-base">
                            Support Ticket
                          </span>
                        </div>
                      </Link>
                    </div> */}
              <div className="item group">
                <button onClick={handleLogout}>
                  <div className="flex space-x-1 lg:space-x-3 items-center text-gray-600 hover:text-gray-900">
                    <span className="text-rose-500" title="Logout">
                      <IcoLogout />
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="item-body dashboard-wrapper w-full">
              {active === "dashboard" ? (
                <Dashboard />
              ) : active === "profile" ? (
                <>
                  <ProfileTab />
                </>
              ) : active === "payment" ? (
                <>
                  <Payment />
                </>
              ) : active === "checkout-order-details" ? (
                <>
                  <CheckoutOrderdetails />
                </>
              ) : active === "order" ? (
                <>
                  <OrderTab />
                </>
              ) : active === "wishlist" ? (
                <>
                  <WishlistTab />
                </>
              ) : active === "address" ? (
                <>
                  <AddressesTab />
                </>
              ) : active === "password" ? (
                <>
                  <PasswordTab />
                </>
              ) : active === "support" ? (
                <>
                  <SupportTab />
                </>
              ) : active === "review" ? (
                <>
                  <ReviewTab products={datas.products} />
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="container-x mx-auto">
          <div className="w-full my-10">
            <div className="hidden lg:block">
              <BreadcrumbCom
                paths={[
                  { name: "home", path: "/" },
                  { name: "profile", path: "/profile" },
                ]}
              />
            </div>
            {/* <div className="lg:hidden ms-4" onClick={drawerAction}>
              <IcoDashboard></IcoDashboard>
            </div> */}
            <div className="w-full bg-white px-10 py-9">
              <div className="hidden lg:block">
                <div className="  title-area w-full flex justify-between items-center">
                  <h1 className="text-[15px] lg:text-[22px] font-bold text-qblack">
                    Your Dashboard
                  </h1>
                  {/* <div className="switch-dashboard flex space-x-3 items-center">
                  <p className="text-qgray text-base">Switch Dashboard</p>
                  <button
                    onClick={() => setSwitchDashboard(!switchDashboard)}
                    type="button"
                    className="w-[73px] h-[31px] border border-[#D9D9D9] rounded-full relative "
                  >
                    <div
                      className={`w-[23px] h-[23px] bg-qblack rounded-full absolute top-[3px] transition-all duration-300 ease-in-out ${
                        switchDashboard ? "left-[44px]" : "left-[4px]"
                      }`}
                    ></div>
                  </button>
                </div> */}
                </div>
              </div>

              {/* // For deskTop  */}
              <div className="hidden lg:block">
                <div className="profile-wrapper w-full mt-8 flex space-x-5 lg:space-x-10">
                  <div className=" min-h-[600px]  border-none lg:border-r border-[rgba(0, 0, 0, 0.1)]">
                    <div className="flex flex-col space-y-6 lg:space-y-10">
                      <div className="item group">
                        <Link to="/profile#dashboard">
                          <div className="flex space-x-1 lg:space-x-3 items-center text-gray-600 hover:text-gray-900">
                            <span className=" text-rose-500">
                              <IcoDashboard />
                            </span>
                            <span className="  font-semibold text-sm lg:text-base">
                              Dashbaord
                            </span>
                          </div>
                        </Link>
                      </div>
                      <div className="item group">
                        <Link to="/profile#profile">
                          <div className="flex space-x-1 lg:space-x-3 items-center text-gray-600 hover:text-gray-900">
                            <span className="text-rose-500">
                              <IcoPeople />
                            </span>
                            <span className="  font-semibold text-sm lg:text-base">
                              Parsonal Info
                            </span>
                          </div>
                        </Link>
                      </div>

                      {/* <div className="item group">
                      <Link to="/profile#payment">
                        <div className="flex space-x-1 lg:space-x-3 items-center text-gray-600 hover:text-gray-900">
                          <span>
                            <IcoPayment />
                          </span>
                          <span className="  font-semibold text-sm lg:text-base">
                            Payment Method
                          </span>
                        </div>
                      </Link>
                    </div> */}
                      <div className="item group">
                        <Link to="/profile#order">
                          <div className="flex space-x-1 lg:space-x-3 items-center text-gray-600 hover:text-gray-900">
                            <span className="text-rose-500">
                              <IcoCart />
                            </span>
                            <span className="  font-semibold text-sm lg:text-base">
                              Order
                            </span>
                          </div>
                        </Link>
                      </div>
                      {/* <div className="item group">
                      <Link to="/profile#review">
                        <div className="flex space-x-1 lg:space-x-3 items-center text-gray-600 hover:text-gray-900">
                          <span>
                            <IcoCart />
                          </span>
                          <span className="  font-semibold text-sm lg:text-base">Order details</span>
                        </div>
                      </Link>
                    </div> */}

                      <div className="item group">
                        <Link to="/profile#wishlist">
                          <div className="flex space-x-1 lg:space-x-3 items-center text-gray-600 hover:text-gray-900">
                            <span className="text-rose-500">
                              <IcoLove />
                            </span>
                            <span className="  font-semibold text-sm lg:text-base">
                              Wishlist
                            </span>
                          </div>
                        </Link>
                      </div>

                      {/* =========Postponded Address Menu  ==================*/}

                      {/* <div className="item group">
                      <Link to="/profile#address">
                        <div className="flex space-x-1 lg:space-x-3 items-center text-gray-600 hover:text-gray-900">
                          <span>
                            <IcoAdress />
                          </span>
                          <span className="  font-semibold text-sm lg:text-base">
                            Address
                          </span>
                        </div>
                      </Link>
                    </div> */}
                      {/* <div className="item group">
                      <Link to="/profile#review">
                        <div className="flex space-x-1 lg:space-x-3 items-center text-gray-600 hover:text-gray-900">
                          <span>
                            <IcoReviewHand />
                          </span>
                          <span className="  font-semibold text-sm lg:text-base">
                            Reviews
                          </span>
                        </div>
                      </Link>
                    </div> */}
                      <div className="item group">
                        <Link to="/profile#password">
                          <div className="flex space-x-1 lg:space-x-3 items-center text-gray-600 hover:text-gray-900">
                            <span className="text-rose-500">
                              <IcoPassword />
                            </span>
                            <span className="  font-semibold text-sm lg:text-base">
                              Change Password
                            </span>
                          </div>
                        </Link>
                      </div>
                      {/* <div className="item group">
                      <Link to="/profile#support">
                        <div className="flex space-x-1 lg:space-x-3 items-center text-gray-600 hover:text-gray-900">
                          <span>
                            <IcoSupport />
                          </span>
                          <span className="  font-semibold text-sm lg:text-base">
                            Support Ticket
                          </span>
                        </div>
                      </Link>
                    </div> */}
                      <div className="item group">
                        <button onClick={handleLogout}>
                          <div className="flex space-x-1 lg:space-x-3 items-center text-gray-600 hover:text-gray-900">
                            <span className="text-rose-500">
                              <IcoLogout />
                            </span>
                            <span className="  font-semibold text-sm lg:text-base">
                              Logout
                            </span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="item-body dashboard-wrapper w-full">
                      {active === "dashboard" ? (
                        <Dashboard />
                      ) : active === "profile" ? (
                        <>
                          <ProfileTab />
                        </>
                      ) : active === "payment" ? (
                        <>
                          <Payment />
                        </>
                      ) : active === "checkout-order-details" ? (
                        <>
                          <CheckoutOrderdetails />
                        </>
                      ) : active === "order" ? (
                        <>
                          <OrderTab />
                        </>
                      ) : active === "wishlist" ? (
                        <>
                          <WishlistTab />
                        </>
                      ) : active === "address" ? (
                        <>
                          <AddressesTab />
                        </>
                      ) : active === "password" ? (
                        <>
                          <PasswordTab />
                        </>
                      ) : active === "support" ? (
                        <>
                          <SupportTab />
                        </>
                      ) : active === "review" ? (
                        <>
                          <ReviewTab products={datas.products} />
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
