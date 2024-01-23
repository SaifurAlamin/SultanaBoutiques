import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetAllCartShowQuery } from "../../../features/api/showcartlistApi";
import {
  useAddToWishListMutation,
  useGetAllWishListQuery,
} from "../../../features/api/wishlistApi";
import ViewMoreTitle from "../ViewMoreTitle";
import QuickViewIco from "../icons/QuickViewIco";
import ThinLove from "../icons/ThinLove";
export default function ProductCardRowStyleOneTwo({
  className,
  datas,
  sectionTitle,
}) {
  const [topSale, setTopSale] = useState([]);

  const [selected, setSelected] = useState(0);
  const customer_ip = JSON.parse(localStorage.getItem("user_ip"));
  const userProfile = JSON.parse(localStorage.getItem("user"));
  const userdata = userProfile?.user;
  const googleUser = JSON.parse(localStorage.getItem("googleUser"));
  const googleUserId = googleUser?.user?.id;
  const [added, setAdded] = useState(false);
  const [select, setSelect] = useState(null);

  const userIP = customer_ip?.user_ip;
  const { data, error, isLoading } = useGetAllCartShowQuery(userIP);
  const cartList = data;

  //Top sell Products
  useEffect(() => {
    fetch("https://www.sultanaboutiques.com/backend/api/home/top-sell/product")
      .then((res) => res.json())
      .then((data) => setTopSale(data?.products));
  }, []);

  //Fetch Wish List

  const { data: wList } = useGetAllWishListQuery(
    userdata?.id ? userdata?.id : googleUserId
  );
  const wishList = wList;

  // Add Wish List
  const [newAddToWList] = useAddToWishListMutation();
  const handleWishList = async (id, i) => {
    const postData = {
      user_id: userdata?.id ? userdata?.id : googleUserId,
      product_id: id,
      quantity: 1,
    };

    const duplicateProductId = wishList.some((item) => item?.product_id == id);
    if (duplicateProductId) {
      toast("Already added !!");
    } else {
      try {
        const response = await newAddToWList(postData);

        setSelect(i);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <ViewMoreTitle
      seeMoreUrl="/all-products/null/null/is_topselling"
      categoryTitle={sectionTitle}
      className="mb-[60px]"
    >
      <div
        className={`section-content w-full grid sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5 ${
          className || ""
        }`}
      >
        {topSale?.slice(0, 8).map((item, i) => (
          <div
            key={item?.id}
            data-aos="fade-left"
            className={`product-row-card-style-one-two w-full h-[250px] bg-white group relative overflow-hidden ${
              className || ""
            }`}
          >
            <div className="flex space-x-5 items-center w-full h-full p-[16px]">
              <Link to={`/single-product/${item?.id}`} state={topSale}>
                <div className="w-[200px] h-[250px]">
                  <img
                    src={`https://sultanaboutiques.com/backend/${item?.image_path}`}
                    alt=""
                    className="w-full h-full object-contain rounded"
                  />
                </div>
              </Link>
              <div className="flex-1 flex flex-col justify-center h-full">
                <div>
                  <Link to={`/single-product/${item?.id}`} state={topSale}>
                    <p className="title mb-2 sm:text-[15px] text-[15px] font-600 text-qblack leading-[24px] line-clamp-2 hover:text-blue-600">
                      {item?.name}
                    </p>
                  </Link>
                  <p className="price flex space-x-2 items-center  mb-2.5">
                    <span className="main-price text-qgray line-through font-600 sm:text-[18px] text-base">
                      {item?.discount == null
                        ? ""
                        : `€${item?.current_sale_price}`}
                    </span>
                    <span className="offer-price text-qred font-600 sm:text-[22px] text-base">
                      €
                      {item?.discount == null
                        ? item?.current_sale_price
                        : item?.current_sale_price - item?.discount}
                    </span>
                  </p>
                  {/* <button
              onClick={handleAddToCart}
              type="button"
              className="w-[116px] h-[40px]"
            >
              <span className="yellow-btn rounded"> Add To Cart</span>
            </button> */}
                </div>
              </div>
            </div>
            {/* quick-access-btns */}
            <div className="quick-access-btns flex flex-col space-y-2 absolute group-hover:right-4 -right-10 top-[30px]  transition-all duration-300 ease-in-out">
              <Link to={`/single-product/${item?.id}`} state={topSale}>
                <span className="w-10 h-10 flex justify-center items-center bg-[#CCECEB] rounded">
                  <QuickViewIco />
                </span>
              </Link>
              <button onClick={() => handleWishList(item?.id, i)} type="button">
                <span
                  className={
                    select === i
                      ? "w-10 h-10 flex justify-center items-center bg-[#f03e3e] rounded"
                      : "w-10 h-10 flex justify-center items-center bg-[#CCECEB] rounded"
                  }
                >
                  <ThinLove />
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        type="warning"
      />
    </ViewMoreTitle>
  );
}
