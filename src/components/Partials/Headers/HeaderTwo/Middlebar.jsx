import { Link } from "react-router-dom";
import { useGetAllCartShowQuery } from "../../../../features/api/showcartlistApi";
import { useGetAllWishListQuery } from "../../../../features/api/wishlistApi";
import Cart from "../../../Cart";
import SearchBox from "../../../Helpers/SearchBox";
import ThinBag from "../../../Helpers/icons/ThinBag";
import ThinLove from "../../../Helpers/icons/ThinLove";
import ThinPeople from "../../../Helpers/icons/ThinPeople";
export default function Middlebar({ className }) {
  // const [toggleCart, setToggle] = useState(false);
  // const cartHandler = () => {
  //   setToggle(!toggleCart);
  // };
  // https://www.sultanaboutiques.com/backend/api/cartlist_count/103.209.20.178
  const userProfile = JSON.parse(localStorage.getItem("user"));
  const userdata = userProfile?.user;

  // Count For Cartlisgt
  const customer_ip = JSON.parse(localStorage.getItem("user_ip"));
  const userIP = customer_ip?.user_ip;

  const { data: cartData } = useGetAllCartShowQuery(userIP);
  const cartList = cartData;

  // Count For WishList
  const { data, error, isLoading } = useGetAllWishListQuery(userdata?.id);

  return (
    <div className={`w-full h-[86px] bg-white ${className}`}>
      <div className="container-x mx-auto h-full">
        <div className="relative h-full">
          <div className="flex justify-between items-center h-full">
            <div>
              <Link to="/">
                <img
                  width="152"
                  height="36"
                  src={`https://sultanaboutiques.com/backend/storage/company_logo/company_logo-17037546399752.png`}
                  alt="logo"
                />
              </Link>
            </div>
            <div className="w-[517px] h-[44px]">
              <SearchBox className="search-com" />
            </div>
            <div className="flex space-x-6 items-center">
              {/* <div className="compaire relative">
                <a href="/products-compaire">
                  <span>
                    <Compair />
                  </span>
                </a>
                <span className="w-[18px] h-[18px] rounded-full bg-qh2-green absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] text-white">
                  2
                </span>
              </div> */}
              <div className="favorite relative">
                <Link to="/wishlist">
                  <span>
                    <ThinLove />
                  </span>
                </Link>
                <span className="w-[18px] h-[18px] rounded-full bg-qh2-green absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] text-white">
                  {data?.length}
                </span>
              </div>
              <div className="cart-wrapper group relative py-4">
                <div className="cart relative cursor-pointer">
                  <Link to="/cart">
                    <span>
                      <ThinBag />
                    </span>
                  </Link>
                  <span className="w-[18px] h-[18px] rounded-full bg-qh2-green absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] text-white">
                    {cartList?.length}
                  </span>
                </div>
                {/* <div className="fixed left-0 top-0 w-full h-full z-40"></div> */}
                {/* hidden group-hover:block" */}
                <Cart className="absolute -right-[45px] top-11 z-50 hidden group-hover:block" />
              </div>

              <div>
                <Link to="/profile">
                  <span>
                    <ThinPeople />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
