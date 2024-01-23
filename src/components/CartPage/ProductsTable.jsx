import { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";
import { useRemoveSingleCartMutation } from "../../features/api/showcartlistApi";

export default function ProductsTable({ className }) {
  const [cartList, setCartDetails] = useState([]);
  const [shippingData, setShippingData] = useState({});
  const [shippingCost, setShippingCost] = useState(0);
  const customer_ip = JSON.parse(localStorage.getItem("user_ip"));
  const userIP = customer_ip?.user_ip;
  // const { data, error, isLoading } = useGetAllCartShowQuery(userIP);
  // const cartList = data;

  const [couponDetails, setCouponDetails] = useState({});

  const [newArray, setNewArray] = useState([]);
  const location = useLocation();
  const [singleQunatity, setSiingleQuantity] = useState(
    location?.state?.quantity
  );

  //All SIngle PAge data
  const singlePageProduct = location?.state?.singleProduct;

  const singlePageData = [
    {
      product_id: singlePageProduct?.id,
      total: singlePageProduct?.current_sale_price * singleQunatity,
      color: singlePageProduct?.color,
      image_path: singlePageProduct?.image_path,
      name: singlePageProduct?.name,
      size: singlePageProduct?.size,
      current_sale_price: singlePageProduct?.current_sale_price,
      quantity: singleQunatity,
    },
  ];

  const singlePageColor = location?.state?.selectColor;
  const singlePageQuantity = location?.state?.quantity;
  const singlePageSize = location?.state?.selectSize;

  const removeCoupon = (cId) => {
    const remaining = newArray.filter((c) => c.id !== cId);
    setNewArray(remaining);
  };

  // const customer_ip = JSON.parse(localStorage.getItem("user_ip"));

  //handle quantity and total
  const handleQuantityChange = (qty, index) => {
    const updatedData = [...cartList];
    updatedData[index].quantity = qty;
    updatedData[index].total = qty * updatedData[index].current_sale_price;
    setCartDetails(updatedData);
  };

  // ---------------Start Calculation Part--------------

  const subTotal = cartList?.reduce(
    (sum, cart) => sum + cart?.quantity * +cart?.current_sale_price,
    0
  );

  const findPercentageByfilter = newArray.filter(
    (p) => p?.type === "percentage"
  );
  const percentageTotal = findPercentageByfilter.reduce(
    (sum, p) => sum + +p?.value,
    0
  );

  const findFixedAmountByfilter = newArray.filter(
    (f) => f?.type === "fixed_amount"
  );
  const fixedAmountTotal = findFixedAmountByfilter.reduce(
    (sum, f) => sum + +f?.value,
    0
  );

  const grandTotal =
    subTotal -
    (fixedAmountTotal + (subTotal * percentageTotal) / 100) +
    +shippingCost;

  const percentage =
    couponDetails?.type === "percentage"
      ? (subTotal * +couponDetails?.value) / 100
      : couponDetails?.type === "fixed_amount"
      ? couponDetails?.value
      : 0;
  const diccountCouponAount =
    fixedAmountTotal + (subTotal * percentageTotal) / 100;

  // single product Calculation
  const singleSubTotal =
    +singlePageProduct?.current_sale_price * singleQunatity;

  const singleGrandTotal =
    singleSubTotal -
    (fixedAmountTotal + (singleSubTotal * percentageTotal) / 100) +
    +shippingCost;

  // ------------------End Calculation Part ----------------------

  // for state

  const checkoutCoupon = {
    percentage,
    grandTotal,
    subTotal,
    couponDetails,
    diccountCouponAount,
    singleGrandTotal,
    singleSubTotal,
    singlePageProduct,
    singleQunatity,
    shippingCost,
    singlePageData,
  };
  localStorage.setItem("addToCartData", JSON.stringify(checkoutCoupon));

  const [spinner, setSpinner] = useState(false);

  // All cartList
  useEffect(() => {
    setSpinner(true);
    fetch(
      `https://www.sultanaboutiques.com/backend/api/show_cartlist/${customer_ip?.user_ip}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCartDetails(data);
        // const output = [...new Set(data?.)]
        // setCartAndWishList([...location?.state, data]);
        setSpinner(false); // Hide loading screen
      });
  }, []);

  localStorage.setItem("checkout", JSON.stringify(cartList));

  // Delete single Cart List
  const [removeFromCart] = useRemoveSingleCartMutation();
  const handleDeleteCartList = async (pId) => {
    const confirm = window.confirm("Are you want do delete?");
    if (confirm) {
      const response = await removeFromCart(pId);

      const remaining = cartList.filter((p) => p.id !== pId);
      setCartDetails(remaining);

      if (response) {
        swal({
          title: "Successfully Deleted",
          text: "Success",
          icon: "success",
        });
      }
    }
  };

  //Coupon Code
  const [ccode, setCouponCode] = useState("");

  const handleChange = (event) => {
    setCouponCode(event.target.value);
  };
  const doubleProduct = cartList?.map((p) => p);
  const FinalCartList = [...new Set(doubleProduct)];
  const duplicateCouponCode = newArray.some((d) => d?.code === ccode);

  const handleCouponDetails = (e) => {
    if (duplicateCouponCode) {
      toast("This coupon is already used");
    } else {
      fetch(`https://www.sultanaboutiques.com/backend/api/couponCheck/${ccode}`)
        .then((res) => res.json())
        .then((data) => {
          setCouponDetails(data);
          setNewArray([...newArray, data]);
        });

      if (couponDetails === "Invalid Coupon Code") {
        swal({
          title: "Invalid coupon code",
          text: "Warning",
          icon: "Warning",
        });
      }
    }
  };

  useEffect(() => {
    fetch("https://www.sultanaboutiques.com/backend/api/shipping/cost/get")
      .then((res) => res.json())
      .then((data) => setShippingData(data));
  }, []);

  // handle Shipping
  const handleShippingData = (data) => {
    if (data === "2") {
      setShippingCost(shippingData?.inside_price);
    } else {
      setShippingCost(shippingData?.outside_price);
    }
  };

  return (
    <div className={` ${className || ""}`}>
      <div className=" relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            {/* table heading */}
            <tr className="text-[13px] font-medium text-black bg-[#F6F6F6] whitespace-nowrap px-2 border-b default-border-bottom uppercase">
              <td className="py-4 pl-10 block whitespace-nowrap min-w-[300px]">
                product
              </td>
              {/* <td className="py-4 whitespace-nowrap text-center">color</td> */}
              {/* <td className="py-4 whitespace-nowrap text-center">size</td> */}
              <th scope="col" className="text-center px-6 py-3">
                price<span className="text-[8px] lg:text-[10px]">(1ps)</span>
              </th>
              <th scope="col" className="text-center px-6 py-3">
                quantity
              </th>
              <th scope="col" className="text-center px-6 py-3">
                total
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Action
              </th>
            </tr>

            <div className="flex justify-center ml-42  mb-2 ">
              <ThreeCircles
                height="50"
                width="50"
                color="#004D40"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={spinner}
              />
            </div>
            {/* table heading end */}
            {!singlePageProduct ? (
              cartList?.map((l, i) => (
                <tr key={i} className="bg-white border-b hover:bg-gray-50">
                  <td className="pl-10  py-4  w-[380px]">
                    <div className="flex space-x-6 items-center">
                      <div className="w-[80px] h-[80px] overflow-hidden flex justify-center items-center border border-[#EDEDED]">
                        <img
                          src={`https://sultanaboutiques.com/backend/${l?.image_path}`}
                          alt="product"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <p className="font-medium text-[15px]  text-qblack">
                          {l?.name}
                        </p>

                        <p className="flex">
                          <span className="text-[12px] font-normal uppercase ">
                            {" "}
                            Size: {l?.size}
                          </span>
                          <span className="ml-2 text-[12px] font-normal">
                            {" "}
                            Color:
                          </span>
                          <span
                            style={{ background: l?.color }}
                            className="ml-1 text-[12px] mt-1 font-normal w-[15px] h-[15px]  block rounded-full border"
                          ></span>
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* <td className="text-center py-4 px-2">
                  <div className=" flex space-x-1 items-center justify-center">
                    {l?.size.split(",").map((item) => (
                      <label className="input-radio">
                        <input
                          type="radio"
                          // name={`question_${question.id}`}
                          // value={option.id}
                          // checked={selectedAnswers[question.id] === option.id}
                          // onChange={() =>
                          //   handleOptionChange(question.id, option.id)
                          // }
                        />
                        {item}
                      </label>
                    ))}
                  </div>
                </td> */}
                  <td className="text-center py-4 px-2">
                    <div className="flex space-x-1 items-center justify-center">
                      <span className="text-[15px] font-normal">
                        € {l?.current_sale_price}
                      </span>
                    </div>
                  </td>
                  <td className=" py-4">
                    <div className="flex justify-center items-center">
                      <input
                        type="number"
                        className="border text-center w-16"
                        defaultValue={l?.quantity}
                        max={100}
                        min={1}
                        onChange={(e) =>
                          handleQuantityChange(+e.target.value, i)
                        }
                      />
                    </div>
                  </td>
                  <td className="text-right py-4">
                    <div className="flex space-x-1 items-center justify-center">
                      <span className="text-[15px] font-normal">
                        €{+l?.current_sale_price * l?.quantity}
                      </span>
                    </div>
                  </td>
                  <td className="text-right py-4">
                    <div className="flex space-x-1 items-center justify-center">
                      <span
                        onClick={() => handleDeleteCartList(l?.id)}
                        className="cursor-pointer "
                      >
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.7 0.3C9.3 -0.1 8.7 -0.1 8.3 0.3L5 3.6L1.7 0.3C1.3 -0.1 0.7 -0.1 0.3 0.3C-0.1 0.7 -0.1 1.3 0.3 1.7L3.6 5L0.3 8.3C-0.1 8.7 -0.1 9.3 0.3 9.7C0.7 10.1 1.3 10.1 1.7 9.7L5 6.4L8.3 9.7C8.7 10.1 9.3 10.1 9.7 9.7C10.1 9.3 10.1 8.7 9.7 8.3L6.4 5L9.7 1.7C10.1 1.3 10.1 0.7 9.7 0.3Z"
                            fill="#AAAAAA"
                          />
                        </svg>
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-white border-b hover:bg-gray-50">
                <td className="pl-10  py-4  w-[380px]">
                  <div className="flex space-x-6 items-center">
                    <div className="w-[80px] h-[80px] overflow-hidden flex justify-center items-center border border-[#EDEDED]">
                      <img
                        src={`https://sultanaboutiques.com/backend/${singlePageProduct?.image_path}`}
                        alt="product"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <p className="font-medium text-[15px]  text-qblack">
                        {singlePageProduct?.name}
                      </p>

                      <p className="flex">
                        <span className="text-[12px] font-normal uppercase ">
                          {" "}
                          Size: {singlePageSize}
                        </span>
                        <span className="ml-2 text-[12px] font-normal">
                          {" "}
                          Color:
                        </span>
                        <span
                          style={{ background: singlePageColor }}
                          className="ml-1 text-[12px] mt-1 font-normal w-[15px] h-[15px]  block rounded-full border"
                        ></span>
                      </p>
                    </div>
                  </div>
                </td>

                {/* <td className="text-center py-4 px-2">
                    <div className=" flex space-x-1 items-center justify-center">
                      {l?.size.split(",").map((item) => (
                        <label className="input-radio">
                          <input
                            type="radio"
                            // name={`question_${question.id}`}
                            // value={option.id}
                            // checked={selectedAnswers[question.id] === option.id}
                            // onChange={() =>
                            //   handleOptionChange(question.id, option.id)
                            // }
                          />
                          {item}
                        </label>
                      ))}
                    </div>
                  </td> */}
                <td className="text-center py-4 px-2">
                  <div className="flex space-x-1 items-center justify-center">
                    <span className="text-[15px] font-normal">
                      € {singlePageProduct?.current_sale_price}
                    </span>
                  </div>
                </td>
                <td className=" py-4">
                  <div className="flex justify-center items-center">
                    <input
                      type="number"
                      className="border text-center w-16"
                      defaultValue={location?.state?.quantity}
                      max={100}
                      min={1}
                      onChange={(e) => setSiingleQuantity(e.target.value)}
                    />
                  </div>
                </td>
                <td className="text-right py-4">
                  <div className="flex space-x-1 items-center justify-center">
                    <span className="text-[15px] font-normal">
                      €{+singlePageProduct?.current_sale_price * singleQunatity}
                    </span>
                  </div>
                </td>
                <td className="text-right py-4">
                  <div className="flex space-x-1 items-center justify-center">
                    <span
                      onClick={() =>
                        handleDeleteCartList(singlePageProduct?.id)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.7 0.3C9.3 -0.1 8.7 -0.1 8.3 0.3L5 3.6L1.7 0.3C1.3 -0.1 0.7 -0.1 0.3 0.3C-0.1 0.7 -0.1 1.3 0.3 1.7L3.6 5L0.3 8.3C-0.1 8.7 -0.1 9.3 0.3 9.7C0.7 10.1 1.3 10.1 1.7 9.7L5 6.4L8.3 9.7C8.7 10.1 9.3 10.1 9.7 9.7C10.1 9.3 10.1 8.7 9.7 8.3L6.4 5L9.7 1.7C10.1 1.3 10.1 0.7 9.7 0.3Z"
                          fill="#AAAAAA"
                        />
                      </svg>
                    </span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="hidden lg:block mt-4">
        <div className="flex items-center mb-6">
          <div className="w-1/2">
            <input
              onChange={handleChange}
              type="text"
              className="bg-white p-3 rounded-s border-none text-[14px] hover:only:"
              placeholder="Write Coupon Code (optional)"
            />
            <button
              onClick={handleCouponDetails}
              className="bg-rose-400 hover:bg-rose-600 -ms-2 text-white rounded-r px-2 py-4 font-semibold text-sm"
              type="button"
            >
              Submit Coupon
            </button>
          </div>
        </div>
        {/* <div className="flex space-x-2.5 items-center">
          <a href="#">
            <div className="w-[220px] h-[50px] bg-[#F6F6F6] flex justify-center items-center">
              <span className="text-sm font-semibold">Continue Shopping</span>
            </div>
          </a>
          <a href="#">
            <div className="w-[140px] h-[50px] bg-[#F6F6F6] flex justify-center items-center">
              <span className="text-sm font-semibold">Update Cart</span>
            </div>
          </a>
        </div> */}
      </div>
      <div className="w-full mt-[0px] flex sm:justify-end">
        <div className="sm:w-[370px] w-full border border-[#EDEDED] px-[35px] py-[26px]">
          <div className="sub-total mb-6">
            <div className=" flex justify-between mb-6">
              <p className="text-[15px] font-medium text-qblack">Subtotal</p>
              <p className="text-[15px] font-medium text-qred">
                €{!singlePageProduct ? subTotal : singleSubTotal}
              </p>
            </div>

            <div className="w-full h-[1px] bg-[#EDEDED]"></div>
          </div>
          <div className="shipping mb-6">
            <span className="text-[15px] font-medium text-qblack  block">
              Shipping
            </span>
            {shippingCost === 0 ? (
              <span className="mb-6 text-xs italic text-qred ">
                Please select shipping method*
              </span>
            ) : (
              ""
            )}
            <ul className="flex flex-col space-y-1 mt-2">
              {/* // free Shipping ===== */}
              {/* <li>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2.5 items-center">
                    <div className="input-radio">
                      <input
                        type="radio"
                        name="price"
                        className="accent-pink-500"
                        value={1}
                        onChange={(e) => handleShippingData(e.target.value)}
                      />
                    </div>
                    <span className="text-[13px] text-normal text-qgraytwo">
                      Free Shipping
                    </span>
                  </div>
                  <span className="text-[13px] text-normal text-qgraytwo">
                    +€00.00
                  </span>
                </div>
              </li> */}
              <li>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2.5 items-center">
                    <div className="input-radio">
                      <input
                        type="radio"
                        name="price"
                        className="accent-pink-500"
                        value={2}
                        onChange={(e) => handleShippingData(e.target.value)}
                      />
                    </div>
                    <span className="text-[13px] text-normal text-qblack">
                      Inside Area
                    </span>
                  </div>
                  <span className="text-[13px] text-normal text-qblack">
                    +€{shippingData?.inside_price}
                  </span>
                </div>
              </li>
              <li>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2.5 items-center">
                    <div className="input-radio">
                      <input
                        type="radio"
                        name="price"
                        className="accent-pink-500"
                        value={3}
                        onChange={(e) => handleShippingData(e.target.value)}
                      />
                    </div>
                    <span className="text-[13px] text-normal text-qblack">
                      Outside Area
                    </span>
                  </div>
                  <span className="text-[13px] text-normal text-qblack">
                    +€{shippingData?.outside_price}
                  </span>
                </div>
              </li>
            </ul>
            <div className="lg:hidden mt-2">
              <div className="flex justify-between items-center">
                <div className="w-[8px]  flex items-center">
                  <input
                    onChange={handleChange}
                    type="text"
                    className="bg-white rounded border border-slate-200 hover:only: w-32 text-[12px]"
                    placeholder="Coupon Code"
                  />
                  <small className="text-qgray ml-1">(optional)</small>
                </div>

                <div className="">
                  <button
                    onClick={handleCouponDetails}
                    className={`p-2 rounded h-full text-sm font-600 bg-rose-400 hover:bg-rose-600 text-white 'search-btn'}`}
                    type="button"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-4">
              {newArray.map((c) => {
                return (
                  <div className=" flex justify-between mb-6" key={c?.id}>
                    <p className="text-[15px] font-medium text-qblack">
                      Coupon Code: <span className="font-bold">{c?.code}</span>{" "}
                      <p className=" text-[12px]">
                        {c?.type === "fixed_amount"
                          ? "(Fixed Amount)"
                          : `(${c?.type}-${+c?.value}%)`}{" "}
                        <button
                          onClick={() => removeCoupon(c?.id)}
                          className="text-qred font-xs text-[12px]"
                        >
                          remove
                        </button>
                      </p>{" "}
                    </p>
                    <p className="text-[15px] font-medium text-qred">
                      -€
                      {c?.type === "percentage"
                        ? (subTotal * +c?.value) / 100
                        : c?.value}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          {/* <div className="shipping-calculation w-full mb-3">
            <div className="title mb-[17px]">
              <h1 className="text-[15px] font-medium">Calculate Shipping</h1>
            </div>
            <div className="w-full h-[50px] border border-[#EDEDED] px-5 flex justify-between items-center mb-2">
              <span className="text-[13px] text-qgraytwo">Select Country</span>
              <span>
                <svg
                  width="11"
                  height="7"
                  viewBox="0 0 11 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.4 6.8L0 1.4L1.4 0L5.4 4L9.4 0L10.8 1.4L5.4 6.8Z"
                    fill="#222222"
                  />
                </svg>
              </span>
            </div>
            <div className="w-full h-[50px]">
              <InputCom
                inputClasses="w-full h-full"
                type="text"
                placeholder="Postcode / ZIP"
              />
            </div>
          </div> */}
          {/* <button type="button" className="w-full mb-10">
            <div className="w-full h-[50px] bg-[#F6F6F6] flex justify-center items-center">
              <span className="text-sm font-semibold">Update Cart</span>
            </div>
          </button> */}

          <div className="total mb-6">
            <div className=" flex justify-between">
              <p className="text-[18px] font-medium text-qblack">Total</p>
              {!singlePageProduct ? (
                <p className="text-[18px] font-medium text-qred">
                  €{grandTotal ? grandTotal : subTotal}
                </p>
              ) : (
                <p className="text-[18px] font-medium text-qred">
                  €{singleGrandTotal ? singleGrandTotal : singleSubTotal}
                </p>
              )}
            </div>
          </div>
          {/* {shippingCost === 0 ? (
            <button>Process</button>
          ) : (
            <Link to="/checkout" state={checkoutCoupon}>
              <div className="w-full h-[50px] rounded bg-qh2-green flex justify-center items-center">
                <span className="text-sm font-semibold text-white">
                  Proceed to Checkout
                </span>
              </div>
            </Link>
          )} */}
          <Link
            to={`${shippingCost === 0 ? "" : "/checkout"}`}
            state={checkoutCoupon}
          >
            <div className="w-full h-[50px] rounded bg-rose-600  flex justify-center items-center">
              <span className="text-sm font-semibold text-white">
                Proceed to Checkout
              </span>
            </div>
          </Link>
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
