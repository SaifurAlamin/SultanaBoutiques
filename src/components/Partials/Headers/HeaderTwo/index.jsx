import { Link } from "react-router-dom";
import { useGetAllCartShowQuery } from "../../../../features/api/showcartlistApi";
import { useGetAllWishListQuery } from "../../../../features/api/wishlistApi";
import ThinBag from "../../../Helpers/icons/ThinBag";
import ThinLove from "../../../Helpers/icons/ThinLove";
import ThinPeople from "../../../Helpers/icons/ThinPeople";
import TopBar from "../../../Partials/Headers/HeaderTwo/TopBar";
import Navbar from "./Navbar";
export default function HeaderTwo({ className, drawerAction }) {
  const userIP = JSON.parse(localStorage.getItem("user_ip"));
  const uIP = userIP?.user_ip;
  const userProfile = JSON.parse(localStorage.getItem("user"));
  const userdata = userProfile?.user;
  const googleUser = JSON.parse(localStorage.getItem("googleUser"));
  const googleUserId = googleUser?.user?.id;

  const { data: cartList } = useGetAllCartShowQuery(uIP);
  const { data: wList } = useGetAllWishListQuery(
    userdata?.id ? userdata?.id : googleUserId
  );

  return (
    <header className={` ${className || ""} header-section-wrapper relative`}>
      <TopBar className="quomodo-shop-top-bar" />
      {/* <Middlebar className="quomodo-shop-middle-bar lg:block hidden" /> */}
      <div className="quomodo-shop-drawer lg:hidden block w-full h-[60px] bg-white">
        <div className="w-full h-full flex justify-between items-center px-5">
          <div onClick={drawerAction} className="text-rose-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h7"
                fill="#f40d30"
              />
            </svg>
            {/* <i class="fa-solid fa-bars text-[#f40d30] text-[19px]"></i> */}
          </div>
          <div>
            <Link to="/">
              <img
                width="52"
                height="16"
                src={`https://sultanaboutiques.com/backend/storage/company_logo/company_logo-17037546399752.png`}
                alt="logo"
              />
            </Link>
          </div>

          <div className="cart relative cursor-pointer">
            <Link to="/cart">
              <span>
                <ThinBag />
              </span>
            </Link>
            <span className="w-[18px] text-white h-[18px] rounded-full bg-rose-600 absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px]">
              {cartList?.length}
            </span>
          </div>
          <div className="cart relative cursor-pointer">
            <Link to="/wishlist">
              <span>
                <ThinLove />
              </span>
            </Link>
            <span className="w-[18px] text-white h-[18px] rounded-full bg-rose-600 absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px]">
              {wList?.length}
            </span>
          </div>

          <div className="relative cursor-pointer">
            <Link to="/profile">
              <span title="Profile">
                <ThinPeople />
              </span>
            </Link>
          </div>
        </div>
      </div>
      <Navbar className="quomodo-shop-nav-bar lg:block hidden" />
    </header>
  );
}
