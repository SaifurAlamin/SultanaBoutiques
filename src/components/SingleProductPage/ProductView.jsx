import { Select } from "flowbite-react";
import { useState } from "react";
import ReactImageMagnify from "react-image-magnify";
import { Link, useLocation, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useAddToCartMutation,
  useGetAllCartShowQuery,
} from "../../features/api/showcartlistApi";
import {
  useAddToWishListMutation,
  useGetAllWishListQuery,
} from "../../features/api/wishlistApi";
import ThinLove from "../Helpers/icons/ThinLove";

export default function ProductView({ className, reportHandler }) {
  const { productId } = useParams();

  const [details, setDetails] = useState({});
  const userProfile = JSON.parse(localStorage.getItem("user"));
  const userdata = userProfile?.user;
  const googleUser = JSON.parse(localStorage.getItem("googleUser"));
  const googleUserId = googleUser?.user?.id;
  const customer_ip = JSON.parse(localStorage.getItem("user_ip"));
  const location = useLocation();

  const singleProducts = location?.state?.find((p) => p.id == productId);

  const porducts = singleProducts
    ? localStorage.setItem("singlePageProducts", JSON.stringify(singleProducts))
    : "";
  const getLocalStorageItem = JSON.parse(
    localStorage.getItem("singlePageProducts")
  );

  const singleProduct = singleProducts ? singleProducts : getLocalStorageItem;

  const productFind = singleProduct?.id !== customer_ip;

  const productsImg = singleProduct?.productImages;
  const [selectSize, setSelectSize] = useState("");
  const [selectColor, setSelectColor] = useState("");
  const [select, setSelect] = useState(0);
  const [selectC, setSelectC] = useState(0);
  const [added, setAdded] = useState(false);

  const [selectedSize, setSelectedSize] = useState("");
  // useEffect(() => {
  //   fetch(
  //     `https://www.sultanaboutiques.com/backend/api/home/productDetails/${productId}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // }, [productId]);
  const handleSizeChange = (current) => {
    setSelectedSize(current);
  };

  const colors = singleProduct?.color.split(",");
  console.log(colors);
  const sizes = singleProduct?.size.split(",");

  const changeColorHandler = (c, i) => {
    setSelectColor(c);
    setSelectC(i);
  };

  const [src, setSrc] = useState("");
  const changeImgHandler = (current) => {
    setSrc(current);
  };
  const [quantity, setQuantity] = useState(1);
  const increment = () => {
    setQuantity((prev) => prev + 1);
  };
  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  // Add To Cart
  const userIP = customer_ip?.user_ip;
  const { data, error, isLoading } = useGetAllCartShowQuery(userIP);
  const cartList = data;

  const filterId = cartList?.find((item) => item?.product_id == productId);

  const [newAddToCart] = useAddToCartMutation();
  const handleAddToCart = async () => {
    if (!added) {
      const postData = {
        customer_ip: customer_ip?.user_ip,
        product_id: singleProduct?.id,
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

          // setAdded(!added);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  // handle Size
  const handleSize = (s, i) => {
    setSelectSize(s);
    setSelect(i);
  };

  //Get All Wish List
  const { data: wList } = useGetAllWishListQuery(
    userdata?.id ? userdata?.id : googleUserId
  );
  const wishList = wList;
  const filterWListId = wishList?.find((item) => item?.product_id == productId);

  //Add To wish List
  const [newAddToWList] = useAddToWishListMutation();
  const handleWishList = async (id) => {
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
      } catch (error) {
        console.log(error);
      }
    }
  };

  const image = {
    src: `https://sultanaboutiques.com/backend/${
      src !== "" ? src : singleProduct?.image_path
    }`, // Replace with your image path
    alt: "Zoomable Image",
  };

  const zoomProperties = {
    width: 400,
    height: 400,
    zoomPosition: "original", // Set zoomPosition to 'original'
  };

  const singleCartForBuyNow = {
    singleProduct,
    selectSize,
    quantity,
    selectColor,
  };
  return (
    <div
      className={`product-view w-full lg:flex justify-between ${
        className || ""
      }`}
    >
      <div data-aos="fade-right" className="lg:w-1/2 xl:mr-[70px] lg:mr-[50px]">
        <div className="w-full">
          <div className="w-full h-[500px] lg:h-[600px] -mt-10 flex justify-center items-center relative mb-1 lg:mb-2">
            {/* <img
              src={`https://sultanaboutiques.com/backend/${src}`}
              // zoomSrc={`https://sultanaboutiques.com/backend/${src}`}
              alt="Shirt"
              // className="object-contain"
              zoomType="hover"
              zoomPreload={true}
            /> */}
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src: `https://sultanaboutiques.com/backend/${
                    src !== "" ? src : singleProduct?.image_path
                  }`,
                },
                largeImage: {
                  src: `https://sultanaboutiques.com/backend/${
                    src !== "" ? src : singleProduct?.image_path
                  }`,
                  width: 1200,
                  height: 1800,
                },
              }}
            />
            {/* discount er jonno */}
            {/* <div className="w-[80px] h-[80px] rounded-full bg-qyellow text-qblack flex justify-center items-center text-xl font-medium absolute left-[30px] top-[30px]">
              <span>-50%</span>
            </div> */}
          </div>
          <div className="flex gap-2 flex-wrap">
            <div
              onClick={() => changeImgHandler(singleProduct?.image_path)}
              className="w-[110px] h-[110px] p-[15px] border -mt-10 border-qgray-border cursor-pointer"
            >
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/${singleProduct.src}`}
                src={`https://sultanaboutiques.com/backend/${singleProduct?.image_path}`}
                alt=""
                className={`w-full h-full object-contain`}
              />
            </div>
            {productsImg &&
              productsImg.length > 0 &&
              productsImg.map((img) => (
                <div
                  onClick={() => changeImgHandler(img)}
                  key={img.id}
                  className="w-[110px] h-[110px] p-[15px] border border-qgray-border cursor-pointer -mt-10"
                >
                  <img
                    // src={`${process.env.PUBLIC_URL}/assets/images/${img.src}`}
                    src={`https://sultanaboutiques.com/backend/${img}`}
                    alt=""
                    className={`w-full h-full object-contain ${
                      src !== img ? "opacity-50" : ""
                    } `}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="product-details w-full mt-10 lg:mt-0">
          <span
            data-aos="fade-up"
            className="text-qblack font-normal uppercase tracking-wider mb-2 inline-block"
          >
            {singleProduct?.name}
          </span>
          {/* <p
            data-aos="fade-up"
            className="text-xl font-medium text-qblack mb-4"
          >
            {singleProduct.description}
          </p> */}

          {/* // Review Part =======  */}
          {/* <div
            data-aos="fade-up"
            className="flex space-x-[10px] items-center mb-6"
          >
            <div className="flex">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </div>
            <span className="text-[13px] font-normal text-qblack">
              6 Reviews
            </span>
          </div> */}

          <div data-aos="fade-up" className="flex space-x-2 items-center mb-7">
            <span className="text-sm font-500 text-qgray line-through mt-2">
              {singleProduct?.discount == null
                ? ""
                : `€${singleProduct?.current_sale_price}`}
            </span>
            <span className="text-2xl font-500 text-qred">
              €
              {singleProduct?.discount == null
                ? singleProduct?.current_sale_price
                : singleProduct?.current_sale_price - singleProduct?.discount}
            </span>
          </div>

          {/* <p
            data-aos="fade-up"
            className="text-qgray text-sm text-normal mb-[30px] leading-7"
          >
            {singleProduct?.description}
          </p> */}

          <div className="flex items-center gap-x-6">
            <div data-aos="fade-up" className="colors mb-[30px]">
              <div className="flex space-x-4 items-center">
                <p className="text-sm md:text-l font-normal uppercase text-qgray mb-[5px] inline-block">
                  Color :
                </p>
                <div>
                  {colors.map((color, i) => (
                    <button
                      key={i}
                      onClick={() => changeColorHandler(color, i)}
                    >
                      <span
                        style={{ background: color, marginRight: "5px" }}
                        className={`w-[20px] h-[20px] block rounded-full ${
                          selectC === i
                            ? "w-[24px] md:w-[26px] h-[24px] md:h-[26px]  block border-2 border-gray-800"
                            : ""
                        }`}
                      ></span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div data-aos="fade-up" className="product-size mb-[30px]">
              <div className=" flex space-x-4 items-center justify-start">
                <p className="text-sm md:text-l font-normal uppercase text-qgray mb-[5px] inline-block">
                  Size:
                </p>
                <Select className="text-center">
                  {singleProduct?.size.split(",").map((item, i) => (
                    <option
                      className="rounded text-center w-4"
                      onClick={() => handleSize(item, i)}
                    >
                      {item}
                    </option>
                    // <button
                    //   className={`border rounded py-1 md:py-2 px-2 text-sm w-[78px] md:w-[84px] uppercase  ${
                    //     select === i ? "border-gray-900" : ""
                    //   } `}
                    //   onClick={() => handleSize(item, i)}
                    // >
                    //   {item}
                    // </button>
                  ))}
                </Select>
              </div>
            </div>
          </div>

          <div
            data-aos="fade-up"
            className="quantity-card-wrapper w-full flex items-center h-[50px] space-x-[10px] mb-[30px]"
          >
            <div className="w-[120px] h-full px-[26px] flex items-center border border-qgray-border">
              <div className="flex justify-between items-center w-full">
                <button
                  onClick={decrement}
                  type="button"
                  className="text-base text-qgray"
                >
                  -
                </button>
                <span className="text-qblack">{quantity}</span>
                <button
                  onClick={increment}
                  type="button"
                  className="text-base text-qgray"
                  onChange={(e) => setQuantity(e.target.value)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="w-[60px] h-full flex justify-center items-center border border-qgray-border">
              <button
                onClick={() => handleWishList(singleProduct?.id)}
                type="button"
              >
                <span
                  className={
                    filterWListId != null
                      ? "w-[60px] h-12 flex justify-center items-center bg-[#f03e3e]  rounded"
                      : "w-[60px] h-12 flex justify-center items-center bg-primarygray rounded"
                  }
                >
                  <ThinLove />
                </span>
              </button>
            </div>
            <div className="flex-1 h-full">
              <Link to="/cart" state={singleCartForBuyNow}>
                <button
                  type="button"
                  className="text-white rounded text-sm bg-qh2-green lg:font-semibold w-full h-full"
                >
                  Buy Now
                </button>
              </Link>
            </div>
            <div className="flex-1 h-full">
              <button
                onClick={handleAddToCart}
                type="button"
                className={`h-12 w-full rounded ${
                  filterId == null ? "bg-rose-600" : "bg-qh2-green md:w-full"
                }`}
              >
                <div>
                  <span
                    className={`text-xs lg:text-sm h-full w-full font-semibold ${
                      filterId == null ? "text-white" : "text-white"
                    }`}
                  >
                    {filterId == null ? "Add to cart" : "Added"}
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* <div data-aos="fade-up" className="mb-[20px]">
            <p className="text-[13px] text-qgray leading-7">
              <span className="text-qblack">Category :</span> Kitchen
            </p>
            <p className="text-[13px] text-qgray leading-7">
              <span className="text-qblack">Keyword :</span> Beer, Foamer
            </p>
            <p className="text-[13px] text-qgray leading-7">
              <span className="text-qblack">SKU:</span> KE-91039
            </p>
          </div> */}

          {/* <div
            data-aos="fade-up"
            className="flex space-x-2 items-center mb-[20px]"
          >
            <span>
              <svg
                width="12"
                height="13"
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 0C0.247634 0 0.475436 0 0.729172 0C0.738324 0.160174 0.747477 0.316279 0.757647 0.493233C1.05816 0.392044 1.33885 0.282211 1.62818 0.203395C3.11296 -0.201361 4.51385 0.0366111 5.84202 0.779512C6.47661 1.13494 7.14171 1.39071 7.86987 1.47207C8.88125 1.58496 9.82093 1.35817 10.7098 0.88426C10.9335 0.765274 11.1522 0.636627 11.411 0.491199C11.4161 0.606117 11.4237 0.693577 11.4237 0.780529C11.4242 3.18822 11.4222 5.5954 11.4288 8.00309C11.4293 8.1892 11.3718 8.29089 11.2096 8.38039C9.31956 9.42279 7.4285 9.43499 5.54557 8.37734C4.06231 7.54443 2.55363 7.43307 0.992568 8.13835C0.804428 8.22327 0.737816 8.33005 0.739341 8.53904C0.749003 9.9206 0.744426 11.3027 0.744426 12.6842C0.744426 12.7849 0.744426 12.8851 0.744426 13C0.48764 13 0.254244 13 0 13C0 8.67582 0 4.34961 0 0Z"
                  fill="#EB5757"
                />
              </svg>
            </span>

            <button
              type="button"
              onClick={reportHandler}
              className="text-qred font-semibold text-[13px]"
            >
              Report This Item
            </button>
          </div>

          <div
            data-aos="fade-up"
            className="social-share flex  items-center w-full"
          >
            <span className="text-qblack text-[13px] mr-[17px] inline-block">
              Share This
            </span>

            <div className="flex space-x-5 items-center">
              <span>
                <svg
                  width="10"
                  height="16"
                  viewBox="0 0 10 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 16V9H0V6H3V4C3 1.3 4.7 0 7.1 0C8.3 0 9.2 0.1 9.5 0.1V2.9H7.8C6.5 2.9 6.2 3.5 6.2 4.4V6H10L9 9H6.3V16H3Z"
                    fill="#3E75B2"
                  />
                </svg>
              </span>
              <span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 0C3.6 0 0 3.6 0 8C0 11.4 2.1 14.3 5.1 15.4C5 14.8 5 13.8 5.1 13.1C5.2 12.5 6 9.1 6 9.1C6 9.1 5.8 8.7 5.8 8C5.8 6.9 6.5 6 7.3 6C8 6 8.3 6.5 8.3 7.1C8.3 7.8 7.9 8.8 7.6 9.8C7.4 10.6 8 11.2 8.8 11.2C10.2 11.2 11.3 9.7 11.3 7.5C11.3 5.6 9.9 4.2 8 4.2C5.7 4.2 4.4 5.9 4.4 7.7C4.4 8.4 4.7 9.1 5 9.5C5 9.7 5 9.8 5 9.9C4.9 10.2 4.8 10.7 4.8 10.8C4.8 10.9 4.7 11 4.5 10.9C3.5 10.4 2.9 9 2.9 7.8C2.9 5.3 4.7 3 8.2 3C11 3 13.1 5 13.1 7.6C13.1 10.4 11.4 12.6 8.9 12.6C8.1 12.6 7.3 12.2 7.1 11.7C7.1 11.7 6.7 13.2 6.6 13.6C6.4 14.3 5.9 15.2 5.6 15.7C6.4 15.9 7.2 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0Z"
                    fill="#E12828"
                  />
                </svg>
              </span>
              <span>
                <svg
                  width="18"
                  height="14"
                  viewBox="0 0 18 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.0722 1.60052C16.432 1.88505 15.7562 2.06289 15.0448 2.16959C15.7562 1.74278 16.3253 1.06701 16.5742 0.248969C15.8985 0.640206 15.1515 0.924742 14.3335 1.10258C13.6933 0.426804 12.7686 0 11.7727 0C9.85206 0 8.28711 1.56495 8.28711 3.48557C8.28711 3.7701 8.32268 4.01907 8.39382 4.26804C5.51289 4.12577 2.9165 2.73866 1.17371 0.604639C0.889175 1.13814 0.71134 1.70722 0.71134 2.34742C0.71134 3.5567 1.31598 4.62371 2.27629 5.26392C1.70722 5.22835 1.17371 5.08608 0.675773 4.83711V4.87268C0.675773 6.5799 1.88505 8.00258 3.48557 8.32268C3.20103 8.39382 2.88093 8.42938 2.56082 8.42938C2.34742 8.42938 2.09845 8.39382 1.88505 8.35825C2.34742 9.74536 3.62784 10.7768 5.15722 10.7768C3.94794 11.7015 2.45412 12.2706 0.818041 12.2706C0.533505 12.2706 0.248969 12.2706 0 12.2351C1.56495 13.2309 3.37887 13.8 5.37062 13.8C11.8082 13.8 15.3294 8.46495 15.3294 3.84124C15.3294 3.69897 15.3294 3.52113 15.3294 3.37887C16.0052 2.9165 16.6098 2.31186 17.0722 1.60052Z"
                    fill="#3FD1FF"
                  />
                </svg>
              </span>
            </div>
          </div> */}
        </div>
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
    </div>
  );
}
