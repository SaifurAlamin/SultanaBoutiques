import React, { useState } from "react";

import { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetPopularProductsQuery } from "../../../features/api/fetchallproductsApi";
import { useGetAllCartShowQuery } from "../../../features/api/showcartlistApi";
import {
  useAddToWishListMutation,
  useGetAllWishListQuery,
} from "../../../features/api/wishlistApi";
import ViewMoreTitle from "../ViewMoreTitle";
import QuickViewIco from "../icons/QuickViewIco";
import ThinLove from "../icons/ThinLove";
import CustomLeftArrow from "./CustomLeftArrow";
import CustomRightArrow from "./CustomRightArrow";
import "./Style.css";
export default function PupularProductCard({ sectionTitle }) {
  const [popularProduct, setPopular] = useState([]);

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

  useEffect(() => {
    fetch(
      "https://www.sultanaboutiques.com/backend/api/home/popular/product/get"
    )
      .then((res) => res.json())
      .then((data) => setPopular(data?.products));
  }, []);
  const { data: popularProducts } = useGetPopularProductsQuery();

  //Fetch Wish List

  const { data: wList } = useGetAllWishListQuery(
    userdata?.id ? userdata?.id : googleUserId
  );
  const wishList = wList;
  // console.log(wishList);
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
  const paramUrl = "popular/product/get";
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      // partialVisibilityGutter: 40 // this is needed to tell the amount of px that should be visible.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      // partialVisibilityGutter: 30 // this is needed to tell the amount of px that should be visible.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      // partialVisibilityGutter: 30 // this is needed to tell the amount of px that should be visible.
    },
  };

  return (
    <ViewMoreTitle
      seeMoreUrl={`/all-products/null/null/is_popular`}
      categoryTitle={sectionTitle}
      className="mb-[60px]"
    >
      <Carousel
        infinite={true}
        autoPlaySpeed={100}
        showDots={true}
        partialVisible={false}
        responsive={responsive}
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        renderButtonGroupOutside
      >
        {popularProduct?.map((item, i) => (
          <div
            className="product-card-style-one-two  w-full h-full bg-white relative group border-2 border-gray-200 lg:border-none rounded overflow-hidden p-0 lg:p-5"
            key={item?.id}
            //   style={{ boxShadow: "0px 15px 64px 0px rgba(0, 0, 0, 0.05)" }}
          >
            <Link to={`/single-product/${item?.id}`} state={popularProduct}>
              <div
                className="product-card-img w-[90%] lg:w-full lg:mx-0 mx-auto h-[322px] mt-4 rounded"
                style={{
                  background: `url(https://sultanaboutiques.com/backend/${item.image_path}) no-repeat center`,
                }}
              ></div>
            </Link>
            <div className="product-card-details flex justify-center h-[102px] items-center  relative">
              {/* add to card button */}
              {/* <div className="absolute w-[204px] h-[54px] left-[80px] -bottom-20 group-hover:bottom-[65px] transition-all duration-300 ease-in-out">
                    <button type="button" className="yellow-btn rounded">
                        <div>
                            <span>Add To Cart</span>
                        </div>
                    </button>
                </div> */}

              <div>
                <Link to={`/single-product/${item?.id}`} state={popularProduct}>
                  <p
                    title={item?.name}
                    className="title mb:1.5 lg:mb-2.5 text-[15px] font-600 text-center text-qblack leading-[24px] line-clamp-2 hover:text-blue-600"
                  >
                    {item.name.length > 21
                      ? `${item?.name.slice(0, 29)}...`
                      : item?.name}
                  </p>
                </Link>
                <div className="flex justify-center ">
                  <div className="price">
                    <span className="main-price text-qgray line-through font-600 text-center text-[16px] lg:text-[18px]">
                      {item?.discount == null
                        ? ""
                        : `€${item?.current_sale_price}`}
                    </span>
                    <span className="offer-price text-center text-qred font-600 text-[18px] lg:text-[22px] mr-1 inline-block mb-2 lg:mb-0">
                      €
                      {item?.discount == null
                        ? item?.current_sale_price
                        : item?.current_sale_price - item?.discount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* quick-access-btns */}
            <div className="quick-access-btns flex flex-col space-y-2 absolute group-hover:right-[50px] -right-[50px] top-20  transition-all duration-300 ease-in-out">
              <Link to={`/single-product/${item?.id}`} state={popularProduct}>
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
              {/* <a href="#">
              <span className="w-10 h-10 flex justify-center items-center bg-[#CCECEB] rounded">
                <Compair />
              </span>
            </a> */}
            </div>
          </div>
        ))}
      </Carousel>
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
