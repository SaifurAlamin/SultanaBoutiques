import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useAddToCartMutation,
  useGetAllCartShowQuery,
} from "../../../features/api/showcartlistApi";
import {
  useAddToWishListMutation,
  useGetAllWishListQuery,
} from "../../../features/api/wishlistApi";
import StarRating from "../StarRating";
import QuickViewIco from "../icons/QuickViewIco";
import ThinLove from "../icons/ThinLove";

export default function ProductCardStyleOne({ datas, type, filtersProducts }) {
  console.log(datas);
  console.log(filtersProducts);
  const single_data = [datas];
  console.log(datas?.review);
  console.log(single_data?.review);
  const customer_ip = JSON.parse(localStorage.getItem("user_ip"));

  const [select, setSelect] = useState(null);
  const [added, setAdded] = useState(false);
  const userProfile = JSON.parse(localStorage.getItem("user"));
  const userdata = userProfile?.user;
  const googleUser = JSON.parse(localStorage.getItem("googleUser"));
  const googleUserId = googleUser?.user?.id;

  const userIP = customer_ip?.user_ip;

  const { data: cartList, error, isLoading } = useGetAllCartShowQuery(userIP);

  const available =
    (datas.cam_product_sale /
      (datas.cam_product_available + datas.cam_product_sale)) *
    100;

  //Get All Wish List
  const { data: wList } = useGetAllWishListQuery(
    userdata?.id ? userdata?.id : googleUserId
  );
  const wishList = wList;

  //Add To wish List
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
        // const response = await axios.post(
        //   `https://www.sultanaboutiques.com/backend/api/addToCartProduct`,
        //   data
        // );

        setSelect(i);
      } catch (error) {
        console.log(error);
      }
    }
  };

  //Add To cart
  const [newAddToCart] = useAddToCartMutation();
  const handleAddToCart = async () => {
    if (!added) {
      const postData = {
        customer_ip: customer_ip?.user_ip,
        product_id: datas?.id,
        quantity: 1,
      };

      const duplicateProductId = cartList.some(
        (item) => item?.product_id == postData?.product_id
      );
      if (duplicateProductId) {
        toast("Already added !!");
      } else {
        try {
          const response = await newAddToCart(postData);
          // const response = await axios.post(
          //   `https://sultanaboutiques.com/backend/public/api/addToCartProduct`,
          //   data
          // );

          setAdded(!added);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  return (
    <div>
      {single_data?.map((item, i) => (
        <div
          className="product-card-one w-full max-h-[430px] bg-white relative group overflow-hidden p-0 lg:p-5 rounded"
          style={{ boxShadow: "0px 15px 64px 0px rgba(0, 0, 0, 0.05)" }}
          key={item.id}
        >
          <Link to={`/single-product/${item?.id}`} state={filtersProducts}>
            {" "}
            <div
              className="product-card-img w-full lg:mx-0 pt-2 h-[280px] rounded"
              style={{
                background: `url(https://sultanaboutiques.com/backend/${datas.image_path}) no-repeat center`,
              }}
            >
              {/* product available progress */}
              {datas.campaingn_product && (
                <>
                  {/* <div className="px-[30px] absolute left-0 top-3 w-full">
              <div className="progress-title flex justify-between ">
                <p className="text-xs text-qblack font-400 leading-6">
                  Prodcuts Available
                </p>
                <span className="text-sm text-qblack font-600 leading-6">
                  {datas.cam_product_available}
                </span>
              </div>
              <div className="progress w-full h-[5px] rounded-[22px] bg-primarygray relative overflow-hidden">
                <div
                  style={{
                    width: `${datas.campaingn_product ? 100 - available : 0}%`,
                  }}
                  className={`h-full absolute left-0 top-0  ${
                    type === 3 ? "bg-qh3-blue" : "bg-qyellow"
                  }`}
                ></div>
              </div>
            </div> */}
                </>
              )}
              {/* product type */}
              {datas.product_type && !datas.campaingn_product && (
                <div className="product-type absolute right-[14px] top-[17px]">
                  {/* <span
              className={`text-[9px] font-700 leading-none py-[6px] px-3 uppercase text-white rounded-full tracking-wider ${
                datas.product_type === "popular" ? "bg-[#19CC40]" : "bg-qyellow"
              }`}
            >
              {datas.product_type}
            </span> */}
                </div>
              )}
            </div>
          </Link>
          <div className="product-card-details px-[30px] pb-[30px] relative">
            {/* add to card button */}
            <div className="absolute w-full h-10 px-[30px] left-0 top-40 group-hover:top-[33px] lg:group-hover:top-[84px] transition-all duration-300 ease-in-out">
              <button
                onClick={handleAddToCart}
                type="button"
                className={` block mx-auto h-12 p-2 rounded ${
                  !added ? "bg-rose-600" : "bg-qh2-green md:w-full"
                }`}
              >
                <div className="flex items-center  justify-center space-x-3 mb-3">
                  <span className={`${!added ? "text-white" : "text-white"}`}>
                    <svg
                      width="14"
                      height="16"
                      viewBox="0 0 14 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-current"
                    >
                      <path d="M12.5664 4.14176C12.4665 3.87701 12.2378 3.85413 11.1135 3.85413H10.1792V3.43576C10.1792 2.78532 10.089 2.33099 9.86993 1.86359C9.47367 1.01704 8.81003 0.425438 7.94986 0.150881C7.53106 0.0201398 6.90607 -0.0354253 6.52592 0.0234083C5.47246 0.193372 4.57364 0.876496 4.11617 1.85052C3.89389 2.32772 3.80368 2.78532 3.80368 3.43576V3.8574H2.8662C1.74187 3.8574 1.51313 3.88028 1.41326 4.15483C1.36172 4.32807 0.878481 8.05093 0.6723 9.65578C0.491891 11.0547 0.324369 12.3752 0.201948 13.3688C-0.0106763 15.0815 -0.00423318 15.1077 0.00220999 15.1371V15.1404C0.0312043 15.2515 0.317925 15.5424 0.404908 15.6274L0.781834 16H13.1785L13.4588 15.7483C13.5844 15.6339 14 15.245 14 15.0521C14 14.9214 12.5922 4.21694 12.5664 4.14176ZM12.982 14.8037C12.9788 14.8266 12.953 14.8952 12.9079 14.9443L12.8435 15.0162H1.13943L0.971907 14.8331L1.63233 9.82901C1.86429 8.04766 2.07047 6.4951 2.19289 5.56684C2.24766 5.16154 2.27343 4.95563 2.28631 4.8543C2.72123 4.85103 4.62196 4.84776 6.98661 4.84776H11.6901L11.6966 4.88372C11.7481 5.1452 12.9594 14.5128 12.982 14.8037ZM4.77338 3.8574V3.48479C4.77338 3.23311 4.80559 2.88664 4.84103 2.72649C5.03111 1.90935 5.67864 1.24584 6.48726 1.03339C6.82553 0.948403 7.37964 0.97782 7.71791 1.10202H7.72113C8.0755 1.22296 8.36545 1.41907 8.63284 1.71978C9.06453 2.19698 9.2095 2.62516 9.2095 3.41615V3.8574H4.77338Z" />
                    </svg>
                  </span>
                  <span className={`${!added ? "text-white" : "text-white"}`}>
                    {!added ? "Add to cart" : "Added "}
                  </span>
                </div>
              </button>
            </div>
            <div className="reviews flexmb-2 mt-1.5 text-center">
              {Array.from(Array(datas.review), () => (
                <span key={datas.review + Math.random()} className="text-sm">
                  {datas?.product_rating == 0 ? (
                    ""
                  ) : (
                    <StarRating rating={datas?.product_rating} />
                  )}
                </span>
              ))}
            </div>
            <Link to={`/single-product/${item?.id}`} state={filtersProducts}>
              <p
                title={datas?.name}
                className="title mb:1.5 lg:mb-2.5 text-[15px] font-600 text-qblack leading-[24px] line-clamp-2 hover:text-blue-600"
              >
                {datas?.name.length > 21
                  ? `${datas?.name.slice(0, 29)}...`
                  : datas?.name}
              </p>
            </Link>
            <p className="price">
              <span className="main-price text-qgray line-through font-600 text-[18px]">
                {datas?.discount == null ? "" : `€${datas?.current_sale_price}`}
              </span>
              <span className="offer-price text-qred font-600 text-[22px]">
                €
                {datas?.discount == null
                  ? datas?.current_sale_price
                  : datas?.current_sale_price - datas?.discount}
              </span>
            </p>
          </div>
          {/* quick-access-btns */}
          <div className="quick-access-btns flex flex-col space-y-2 absolute group-hover:right-4 -right-10 top-20  transition-all duration-300 ease-in-out">
            <Link to={`/single-product/${item?.id}`} state={filtersProducts}>
              <span className="w-10 h-10 flex justify-center items-center bg-primarygray rounded">
                <QuickViewIco />
              </span>
            </Link>

            <button onClick={() => handleWishList(item?.id, i)} type="button">
              <span
                className={
                  select === i
                    ? "w-10 h-10 flex justify-center items-center bg-[#f03e3e] rounded"
                    : "w-10 h-10 flex justify-center items-center bg-primarygray rounded"
                }
              >
                <ThinLove />
              </span>
            </button>
          </div>
        </div>
      ))}
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
    </div>
  );
}
