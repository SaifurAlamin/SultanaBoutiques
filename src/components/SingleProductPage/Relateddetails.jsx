import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useAddToCartMutation,
  useGetAllCartShowQuery,
} from "../../features/api/showcartlistApi";
import BreadcrumbCom from "../BreadcrumbCom";
import Star from "../Helpers/icons/Star";
import Layout from "../Partials/LayoutHomeTwo";
import Reviews from "./Reviews";
const relateddetails = ({ className }) => {
  const { id } = useParams();
  const [added, setAdded] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const productsImg = productDetails?.productImages;
  const [selectSize, setSelectSize] = useState("");
  const [selectColor, setSelectColor] = useState("");
  const [select, setSelect] = useState(0);
  const [selectC, setSelectC] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");

  const handleSizeChange = (current) => {
    setSelectedSize(current);
  };

  // const colors = productDetails?.color.split(",");
  // const sizes = productDetails?.size.split(",");

  const changeColorHandler = (c, i) => {
    setSelectColor(c);
    setSelectC(i);
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
  // // Fetch all review
  useEffect(() => {
    fetch(
      `https://www.sultanaboutiques.com/backend/api/home/productDetails/${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProductDetails(data);
        // Hide loading screen
      });
  }, []);

  // Add To Cart
  const customer_ip = JSON.parse(localStorage.getItem("user_ip"));
  const userIP = customer_ip?.user_ip;
  const { data, error, isLoading } = useGetAllCartShowQuery(userIP);
  const cartList = data;
  const [newAddToCart] = useAddToCartMutation();
  const handleAddToCart = async () => {
    if (!added) {
      const postData = {
        customer_ip: customer_ip?.user_ip,
        product_id: productDetails?.id,
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

          setAdded(!added);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <Layout childrenClasses="pt-5 pb-0 px-40">
      <div className="breadcrumb-wrapper w-full ">
        <div className="container-x mx-auto">
          <BreadcrumbCom
            paths={[
              { name: "home", path: "/" },
              { name: "single product", path: "/single-product" },
            ]}
          />
        </div>
      </div>
      <div
        className={`product-view w-full lg:flex justify-between ${
          className || ""
        }`}
      >
        <div
          data-aos="fade-right"
          className="lg:w-1/2 xl:mr-[70px] lg:mr-[50px]"
        >
          <div className="w-full">
            <div className="w-full h-[600px] border border-qgray-border flex justify-center items-center overflow-hidden relative mb-3">
              <img
                src={`https://sultanaboutiques.com/backend/${productDetails?.image_path}`}
                alt=""
                className="object-contain"
              />
              {/* discount er jonno */}
              {/* <div className="w-[80px] h-[80px] rounded-full bg-qyellow text-qblack flex justify-center items-center text-xl font-medium absolute left-[30px] top-[30px]">
              <span>-50%</span>
            </div> */}
            </div>
            <div className="flex gap-2 flex-wrap">
              <div
                onClick={() => changeImgHandler(productDetails?.image_path)}
                className="w-[110px] h-[110px] p-[15px] border border-qgray-border cursor-pointer"
              >
                <img
                  src={`https://sultanaboutiques.com/backend/${productDetails?.image_path}`}
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
                    className="w-[110px] h-[110px] p-[15px] border border-qgray-border cursor-pointer"
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
              className="text-qgray text-xs font-normal uppercase tracking-wider mb-2 inline-block"
            >
              {productDetails?.name}
            </span>
            <p
              data-aos="fade-up"
              className="text-xl font-medium text-qblack mb-4"
            >
              {productDetails?.description}
            </p>

            <div
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
            </div>

            <div
              data-aos="fade-up"
              className="flex space-x-2 items-center mb-7"
            >
              <span className="text-sm font-500 text-qgray line-through mt-2">
                €{productDetails?.current_purchase_cost}
              </span>
              <span className="text-2xl font-500 text-qred">
                €{productDetails?.current_sale_price}
              </span>
            </div>

            <p
              data-aos="fade-up"
              className="text-qgray text-sm text-normal mb-[30px] leading-7"
            >
              It is a long established fact that a reader will be distracted by
              the readable there content of a page when looking at its layout.
            </p>

            {/* <div data-aos="fade-up" className="colors mb-[30px]">
                            <div className="flex space-x-4 items-center">

                                <p className="text-sm md:text-l font-normal uppercase text-qgray mb-[5px] inline-block">
                                    Color :
                                </p>
                                {colors.map((color, i) => (
                                    <button onClick={() => changeColorHandler(color, i)}>
                                        <span
                                            key={i}
                                            style={{ background: color, marginRight: "5px" }}
                                            className={`w-[20px] h-[20px] block rounded-full border ${selectC === i
                                                ? "w-[24px] md:w-[32px] h-[24px] md:h-[32px] rounded-full block border-2 border-gray-900"
                                                : ""
                                                }`}
                                        ></span>
                                    </button>
                                ))}
                            </div>
                        </div> */}

            {/* <div data-aos="fade-up" className="product-size mb-[30px]">
                            <span className="text-sm md:text-l font-normal uppercase text-qgray mb-[5px] inline-block">
                                SIZE :{" "}
                                <span className="text-current md:text-xl"> {selectSize}</span>
                            </span>
                            <div className=" flex space-x-1 items-center justify-start">
                                {productDetailsByFind?.size.split(",").map((item, i) => (
                                    <button
                                        className={`border rounded py-1 md:py-2 px-2 w-[42px] md:w-[64px] uppercase  ${select === i ? "border-gray-900" : ""
                                            } `}
                                        onClick={() => handleSize(item, i)}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div> */}

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
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="w-[60px] h-full flex justify-center items-center border border-qgray-border">
                <button type="button">
                  <span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17 1C14.9 1 13.1 2.1 12 3.7C10.9 2.1 9.1 1 7 1C3.7 1 1 3.7 1 7C1 13 12 22 12 22C12 22 23 13 23 7C23 3.7 20.3 1 17 1Z"
                        stroke="#D5D5D5"
                        strokeWidth="2"
                        strokeMiterlimit="10"
                        strokeLinecap="square"
                      />
                    </svg>
                  </span>
                </button>
              </div>
              <div className="flex-1 h-full">
                <Link to="/">
                  <button
                    type="button"
                    className="text-white rounded text-sm bg-qh2-green font-semibold w-full h-full"
                  >
                    Byu Now
                  </button>
                </Link>
              </div>
              <div className="flex-1 h-full">
                <button
                  onClick={handleAddToCart}
                  type="button"
                  className={`h-12 p-2 mx-auto rounded ${
                    !added ? "yellow-btn" : "bg-qh2-green md:w-full"
                  }`}
                >
                  <div>
                    <span
                      className={`${!added ? "text-gray-800" : "text-white"}`}
                    >
                      {!added ? "Add to cart" : "Added"}
                    </span>
                  </div>
                </button>
              </div>
            </div>

            <div data-aos="fade-up" className="mb-[20px]">
              <p className="text-[13px] text-qgray leading-7">
                <span className="text-qblack">Category :</span> Kitchen
              </p>
              <p className="text-[13px] text-qgray leading-7">
                <span className="text-qblack">Keyword :</span> Beer, Foamer
              </p>
              <p className="text-[13px] text-qgray leading-7">
                <span className="text-qblack">SKU:</span> KE-91039
              </p>
            </div>
          </div>
        </div>
      </div>
      <Reviews />
    </Layout>
  );
};

export default relateddetails;
