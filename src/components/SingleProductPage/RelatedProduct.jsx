import React, { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link, useLocation, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useAddToWishListMutation,
  useGetAllWishListQuery,
} from "../../features/api/wishlistApi";
import CustomLeftArrow from "../Helpers/Cards/CustomLeftArrow";
import CustomRightArrow from "../Helpers/Cards/CustomRightArrow";
import QuickViewIco from "../Helpers/icons/QuickViewIco";
import ThinLove from "../Helpers/icons/ThinLove";
const RelatedProduct = () => {
  const { productId } = useParams();
  const location = useLocation();

  const relatedProducts = location?.state;
  const porducts = relatedProducts
    ? localStorage.setItem("remainingProducts", JSON.stringify(relatedProducts))
    : "";
  const getLocalStorageItem = JSON.parse(
    localStorage.getItem("remainingProducts")
  );
  const remainingProduct = getLocalStorageItem.filter(
    (item) => item?.id != productId
  );

  const [spinner, setSpinner] = useState(false);
  const [select, setSelect] = useState(null);
  const userProfile = JSON.parse(localStorage.getItem("user"));
  const userdata = userProfile?.user;

  //Fetch Wish List

  const { data: wList } = useGetAllWishListQuery(userdata?.id);
  const wishList = wList;

  // Add Wish List
  const [newAddToWList] = useAddToWishListMutation();
  const handleWishList = async (id, i) => {
    const postData = {
      user_id: userdata?.id,
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

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      partialVisibilityGutter: 40, // this is needed to tell the amount of px that should be visible.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      partialVisibilityGutter: 30, // this is needed to tell the amount of px that should be visible.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 30, // this is needed to tell the amount of px that should be visible.
    },
  };
  return (
    <div className="p-10">
      <h2 className="text-success text-shadow-lg text-center text-[27px]">
        RELATED PRODUCTS
      </h2>
      <div className="flex justify-center ml-42  mb-2 ">
        <ThreeDots
          height="100"
          width="100"
          radius="9"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={spinner}
        />
      </div>
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
        {remainingProduct?.slice(0, 10).map((item, i) => (
          <div
            className="product-card-style-one-two  w-full h-full bg-white relative group overflow-hidden p-0 lg:p-5"
            key={item?.id}
            //   style={{ boxShadow: "0px 15px 64px 0px rgba(0, 0, 0, 0.05)" }}
          >
            <Link
              to={`/single-product/${item?.id}`}
              state={getLocalStorageItem}
            >
              <div
                className="product-card-img w-full h-[322px] mt-4"
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
                <Link
                  to={`/single-product/${item?.id}`}
                  state={getLocalStorageItem}
                >
                  <p className="title mb-2   text-center text-qblack leading-[24px] line-clamp-2 hover:text-blue-600">
                    {item.name}
                  </p>
                </Link>
                <div className="flex justify-center ">
                  <div className="price">
                    <span className="main-price text-qgray line-through font-600 text-center text-[18px]">
                      {item?.discount == null
                        ? ""
                        : `€${item?.current_sale_price}`}
                    </span>
                    <span className="offer-price text-center text-qred mb-4 mr-1 inline-block">
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
              <Link
                to={`/single-product/${item?.id}`}
                state={getLocalStorageItem}
              >
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
    </div>
  );
};

export default RelatedProduct;
