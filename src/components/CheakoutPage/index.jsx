import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/LayoutHomeTwo";

export default function CheakoutPage() {
  const userProfile = JSON.parse(localStorage.getItem("user"));
  const googleUser = JSON.parse(localStorage.getItem("googleUser"));
  const cartDetailsFromAddtoCart = JSON.parse(localStorage.getItem("checkout"));

  const addToCartData = JSON.parse(localStorage.getItem("addToCartData"));

  const singlepageDetails = addToCartData?.singlePageProduct;

  const singlepageQuantity = addToCartData?.singleQunatity;
  const singlePageData = addToCartData?.singlePageData;

  const findSinglePId = singlePageData?.some((item) => item?.product_id);

  const user_ip = JSON.parse(localStorage.getItem("user_ip"));

  const userdata = userProfile?.user;

  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [checkedPaymentMethod, setCheckedPaymentMethod] = useState(false);
  const [billingAddress, setBillingAddress] = useState("");
  const [billingPhone, setBillingPhone] = useState("");
  const [shippingPhone, setShippingPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [billingPostalCode, setBillingPostalCode] = useState("");
  const [shippingPostalCode, setShippingPostalCode] = useState("");
  const [shippingName, setShippingName] = useState("");
  const [shippingNumber, setShippingNumber] = useState("");
  const [shippingMail, setShippingMail] = useState("");
  const [billing_provenance, setBillingProvenance] = useState("");
  const [shipping_provenance, setShippingProvenance] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [order_id, setOrderId] = useState("");
  const [cartList, setCartList] = useState([]);

  const s_id = localStorage.getItem("stripe_session_id");

  const productName = singlepageDetails?.name
    ? singlepageDetails?.name
    : "Shirt";

  const amt = addToCartData?.singleGrandTotal
    ? addToCartData?.singleGrandTotal
    : addToCartData?.grandTotal;
  const orderProduct = { productName, amt };

  const subTotal = cartDetailsFromAddtoCart?.reduce(
    (sum, cart) => sum + cart?.quantity * +cart?.current_sale_price,
    0
  );

  // All cartList
  useEffect(() => {
    fetch(
      `https://www.sultanaboutiques.com/backend/api/show_cartlist/${user_ip?.user_ip}`
    )
      .then((res) => res.json())
      .then((data) => setCartList(data));
  }, []);

  //payment gateway data passing
  const handleStripeOrder = async (e) => {
    e.preventDefault();
    if (
      !userdata?.address &&
      !googleUser?.user?.address &&
      billingAddress === ""
    ) {
      toast("Billing address is required !!");
    } else if (billingCity === "") {
      toast("Billing city is required !!");
    } else if (billingPostalCode === "") {
      toast("Billing postal code is required !!");
    } else if (paymentMethod === "") {
      toast("Payment method is required !!");
    } else if (
      !userdata?.phone &&
      !googleUser?.user?.phone &&
      billingPhone === ""
    ) {
      toast("Phone Number is Required");
    } else {
      const data = {
        user_id: userdata?.id ? userdata?.id : googleUser?.user?.id,
        total_amount: addToCartData?.singleGrandTotal
          ? addToCartData?.singleGrandTotal
          : addToCartData?.grandTotal,
        billing_address: billingAddress
          ? billingAddress
          : userdata?.address
          ? userdata?.address
          : googleUser?.user?.address,
        shipping_address: shippingAddress
          ? shippingAddress
          : billingAddress
          ? billingAddress
          : userdata?.address
          ? userdata?.address
          : googleUser?.user?.address,
        billing_city: billingCity,
        shipping_city: shippingCity ? shippingCity : billingCity,
        billing_postal_code: billingPostalCode,
        shipping_postal_code: shippingPostalCode
          ? shippingPostalCode
          : billingPostalCode,
        payment_method_id: paymentMethod,
        billing_phone_number: billingPhone,
        shipping_phone_number: shippingPhone,
        billing_provenance,
        shipping_provenance,
        coupon_discount: addToCartData?.diccountCouponAount
          ? addToCartData?.diccountCouponAount
          : "",
        shipping_cost: addToCartData?.shippingCost
          ? addToCartData?.shippingCost
          : "",
        products: findSinglePId ? singlePageData : cartDetailsFromAddtoCart,
      };

      localStorage.removeItem("checkout");
      try {
        const response = await axios.post(
          `https://www.sultanaboutiques.com/backend/api/addOrder`,
          data
        );

        localStorage.setItem(
          "order_id",
          JSON.stringify(response.data?.order_id)
        );

        setOrderId(response.data?.order_id);
        localStorage.setItem("checkoutDetails", JSON.stringify(data));
        localStorage.setItem("orderDetailsInfo", JSON.stringify(response));
        localStorage.setItem("orderProduct", JSON.stringify(orderProduct));
        localStorage.removeItem("addToCartData");
        navigate("/pay");
      } catch (error) {
        console.log(error);
      }
    }

    // Delete all carList from Cart page
    try {
      const response = await axios.delete(
        `https://sultanaboutiques.com/backend/api/all_cartlist_delete/${user_ip?.user_ip}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  //Place Order
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (
      !userdata?.address &&
      !googleUser?.user?.address &&
      billingAddress === ""
    ) {
      toast("Billing address is required !!");
    } else if (billingCity === "") {
      toast("Billing city is required !!");
    } else if (billingPostalCode === "") {
      toast("Billing postal code is required !!");
    } else if (paymentMethod === "") {
      toast("Payment method is required !!");
    } else if (
      !userdata?.phone &&
      !googleUser?.user?.phone &&
      billingPhone === ""
    ) {
      toast("Phone Number is Required");
    } else {
      const data = {
        user_id: userdata?.id ? userdata?.id : googleUser?.user?.id,
        total_amount: addToCartData?.singleGrandTotal
          ? addToCartData?.singleGrandTotal
          : addToCartData?.grandTotal,
        billing_address: billingAddress
          ? billingAddress
          : userdata?.address
          ? userdata?.address
          : googleUser?.user?.address,
        shipping_address: shippingAddress
          ? shippingAddress
          : billingAddress
          ? billingAddress
          : userdata?.address
          ? userdata?.address
          : googleUser?.user?.address,
        billing_city: billingCity,
        shipping_city: shippingCity ? shippingCity : billingCity,
        billing_postal_code: billingPostalCode,
        shipping_postal_code: shippingPostalCode
          ? shippingPostalCode
          : billingPostalCode,
        billing_phone_number: billingPhone,
        shipping_phone_number: shippingPhone,
        billing_provenance,
        shipping_provenance,
        payment_method_id: paymentMethod,
        coupon_discount: addToCartData?.diccountCouponAount
          ? addToCartData?.diccountCouponAount
          : "",
        shipping_cost: addToCartData?.shippingCost
          ? addToCartData?.shippingCost
          : "",
        products: findSinglePId ? singlePageData : cartDetailsFromAddtoCart,
      };

      localStorage.removeItem("checkout");
      localStorage.removeItem("cartList");
      try {
        const response = await axios.post(
          `https://www.sultanaboutiques.com/backend/api/addOrder`,
          data
        );
        if (response?.data?.status === 200) {
          const res = await axios.delete(
            `https://sultanaboutiques.com/backend/api/all_cartlist_delete/${user_ip?.user_ip}`
          );

          // const remaining = cartList.filter((p) => p.product_id != "422");
          // setCartList(remaining);
          swal({
            title: "Successfully Orderd",
            text: "Success",
            icon: "success",
          });
          localStorage.removeItem("addToCartData");
          localStorage.setItem("checkoutDetails", JSON.stringify(data));
          localStorage.setItem("orderDetailsInfo", JSON.stringify(response));
          navigate("/profile#checkout-order-details");
        }
      } catch (error) {
        console.log(error);
      }
    }

    // Delete all carList from Cart page
  };

  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="checkout-page-wrapper w-full bg-white pb-[60px]">
        <div className="w-full mb-5">
          <PageTitle
            title="Checkout"
            breadcrumb={[
              { name: "home", path: "/" },
              { name: "checkout", path: "/checkout" },
            ]}
          />
        </div>
        <div className="checkout-main-content w-full">
          <div className="container-x mx-auto">
            <div className="w-full lg:flex lg:space-x-[30px]">
              <div className="lg:w-1/2 w-full">
                <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-5">
                  Billing Details
                </h1>
                <div className="form-area">
                  <form>
                    <div className=" mb-6">
                      <div className="w-full">
                        <input
                          className="sshadow appearance-none border rounded w-full py-2 md:py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          label="First Name*"
                          placeholder="Your Name"
                          inputClasses="w-full h-[50px]"
                          value={
                            userdata?.name
                              ? userdata?.name
                              : googleUser?.user?.name
                          }
                        />
                      </div>
                    </div>
                    <div className="flex space-x-5 items-center mb-6">
                      <div className="w-1/2">
                        <input
                          className="shadow appearance-none border rounded w-full py-2 md:py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm lg:text-base"
                          label="Email Address*"
                          placeholder="Your Email"
                          inputClasses="w-full h-[50px]"
                          value={
                            userdata?.email
                              ? userdata?.email
                              : googleUser?.user?.email
                          }
                        />
                      </div>
                      <div className="flex-1">
                        <input
                          className={`shadow appearance-none border rounded w-full py-2 md:py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline lg:text-base ${
                            !billingPhone &&
                            !userdata?.phone &&
                            !googleUser?.user?.phone
                              ? "border-qred"
                              : "border-gray-100"
                          }`}
                          label="Phone Number*"
                          placeholder="Phone Number"
                          inputClasses="w-full h-[50px]"
                          defaultValue={
                            userdata?.phone
                              ? userdata?.phone
                              : googleUser?.user?.phone
                          }
                          onChange={(e) => setBillingPhone(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className=" flex space-x-5 items-center mb-6">
                      <div className="w-1/2">
                        <input
                          className={`shadow appearance-none border rounded w-full py-2 md:py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline lg:text-base ${
                            !billingAddress &&
                            !userdata?.address &&
                            !googleUser?.user?.address
                              ? "border-qred"
                              : "border-gray-100"
                          }`}
                          label="Address*"
                          placeholder="Your Address"
                          inputClasses="w-full h-[50px]"
                          defaultValue={
                            userdata?.address
                              ? userdata?.address
                              : googleUser?.user?.address
                          }
                          onChange={(e) => setBillingAddress(e.target.value)}
                          title={
                            userdata?.address
                              ? userdata?.address
                              : googleUser?.user?.address
                          }
                        />
                      </div>
                      <div className="flex-1">
                        <input
                          className={` border rounded w-full max-w-xs py-2 px-3 text-gray-700  ${
                            billingPostalCode === ""
                              ? "border-qred"
                              : "border-gray-100"
                          }`}
                          label="Postcode / ZIP*  "
                          placeholder="Postal code"
                          inputClasses="w-full h-[50px]"
                          onChange={(e) => setBillingPostalCode(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex space-x-5 items-center mb-6">
                      <div className="w-1/2">
                        <input
                          onChange={(e) => setBillingCity(e.target.value)}
                          className={`border  rounded focus:border-none w-full max-w-xs py-2  px-3 ${
                            billingCity === ""
                              ? "border-qred"
                              : "border-gray-100"
                          }`}
                          placeholder="Your City"
                          inputClasses="w-full h-[50px]"
                        />
                      </div>

                      <div className="flex-1">
                        <input
                          className={` border rounded w-full max-w-xs py-2 px-3 text-gray-700`}
                          label="Provenance/Street(optional)"
                          placeholder="Provenance"
                          inputClasses="w-full h-[50px]"
                          onChange={(e) => setBillingProvenance(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <h1 className="text-2xl text-qblack font-medium mb-3">
                        Shipping Details
                      </h1>
                      <div className="flex space-x-2 items-center mb-10">
                        <div>
                          <input
                            type="checkbox"
                            name=""
                            id="address"
                            onClick={() => setChecked(!checked)}
                          />
                        </div>
                        <label
                          htmlFor="address"
                          className="text-qblack text-[15px] select-none"
                        >
                          Ship to a different address
                        </label>
                      </div>
                    </div>
                  </form>
                </div>

                {/* -----------------SHipping Part------------  */}
                {checked ? (
                  <div className="form-area">
                    <form>
                      <div className=" mb-6">
                        <div className="w-full">
                          <input
                            className="shadow appearance-none border rounded w-full py-2 md:py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            label="First Name*"
                            placeholder="Your Name"
                            inputClasses="w-full h-[50px]"
                            value={
                              userdata?.name
                                ? userdata?.name
                                : googleUser?.user?.name
                            }
                            onChange={(e) => setShippingName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="flex space-x-5 items-center mb-6">
                        <div className="w-1/2">
                          <input
                            className="shadow appearance-none border rounded w-full py-2 md:py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm lg:text-base"
                            label="Email Address*"
                            placeholder="Your Email"
                            inputClasses="w-full h-[50px]"
                            value={
                              userdata?.email
                                ? userdata?.email
                                : googleUser?.user?.email
                            }
                            onChange={(e) => setShippingMail(e.target.value)}
                            title={
                              userdata?.email
                                ? userdata?.email
                                : googleUser?.user?.email
                            }
                          />
                        </div>
                        <div className="flex-1">
                          <input
                            className="shadow appearance-none border rounded w-full py-2 md:py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            label="Phone Number*"
                            placeholder="Phone Number"
                            inputClasses="w-full h-[50px]"
                            defaultValue={
                              userdata?.phone
                                ? userdata?.phone
                                : googleUser?.user?.phone
                            }
                            onChange={(e) => setShippingNumber(e.target.value)}
                          />
                        </div>
                      </div>
                      {/* <div className="mb-6">
                      <h1 className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                        Country*
                      </h1>
                      <div className="w-full h-[50px] border border-[#EDEDED] px-5 flex justify-between items-center mb-2">
                        <span className="text-[13px] text-qgraytwo">
                          Select Country
                        </span>
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
                            ></path>
                          </svg>
                        </span>
                      </div>
                    </div> */}
                      <div className=" flex space-x-5 items-center mb-6">
                        <div className="w-1/2">
                          <input
                            className={`shadow appearance-none border rounded w-full py-2 md:py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                              !billingAddress &&
                              !userdata?.address &&
                              !googleUser?.user?.address
                                ? "border-qred"
                                : "border-gray-100"
                            }`}
                            label="Address*"
                            placeholder="Your Address"
                            inputClasses="w-full h-[50px]"
                            defaultValue={
                              userdata?.address
                                ? userdata?.address
                                : googleUser?.user?.address
                            }
                            onChange={(e) => setShippingAddress(e.target.value)}
                          />
                        </div>
                        <div className="flex-1">
                          <input
                            className={`border rounded w-full max-w-xs py-2 px-3 text-gray-700 `}
                            label="Postcode / ZIP*  "
                            placeholder="Postal code"
                            inputClasses="w-full h-[50px]"
                            onChange={(e) =>
                              setShippingPostalCode(e.target.value)
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="flex space-x-5 items-center mb-6">
                        {/* <select
                          
                          className={`border  rounded focus:border-none w-full max-w-xs py-2 md:py-2 px-3 ${
                            shippingCity === ""
                              ? "border-qred"
                              : "border-gray-100"
                          }`}
                        > */}
                        <div className="w-1/2">
                          <input
                            className={`border  rounded focus:border-none w-full max-w-xs py-2 md:py-2 px-3  `}
                            label=""
                            placeholder="Your City"
                            inputClasses="w-full h-[50px]"
                            onChange={(e) => setShippingCity(e.target.value)}
                          />
                        </div>

                        <div className="flex-1">
                          <input
                            className={` border rounded w-full max-w-xs py-2 px-3  text-xs lg:text-base text-gray-700`}
                            label="Provenance/Street(optional)"
                            placeholder="Provenance"
                            inputClasses="w-full h-[50px]"
                            onChange={(e) =>
                              setShippingProvenance(e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="flex-1">
                <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-5">
                  Order Summary
                </h1>

                <div className="w-full px-10 py-[30px] border border-[#EDEDED]">
                  <div className="sub-total mb-6">
                    <div className=" flex justify-between mb-5">
                      <p className="text-[13px] font-medium text-qblack uppercase">
                        PROduct
                      </p>
                      <p className="text-[13px] font-medium text-qblack uppercase">
                        total
                      </p>
                    </div>
                    <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                  </div>
                  <div className="product-list w-full mb-[30px]">
                    {!singlepageDetails ? (
                      cartDetailsFromAddtoCart.map((l) => (
                        <ul className="flex flex-col space-y-5" key={l?.id}>
                          <li>
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="text-[15px] text-qblack mb-2.5">
                                  {l?.name}
                                  <sup className="text-[13px] text-qgray ml-2 mt-2">
                                    x{l?.quantity}
                                  </sup>
                                </h4>
                                {/* <p className="text-[13px] text-qgray">
                            64GB, Black, 44mm, Chain Belt
                          </p> */}
                              </div>
                              <div>
                                <span className="text-[15px] text-qblack font-medium">
                                  {l?.current_sale_price * +l?.quantity}
                                </span>
                              </div>
                            </div>
                          </li>
                        </ul>
                      ))
                    ) : (
                      <ul className="flex flex-col space-y-5">
                        <li>
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="text-[15px] text-qblack mb-2.5">
                                {singlepageDetails?.name}
                                <sup className="text-[13px] text-qgray ml-2 mt-2">
                                  x{singlepageQuantity}
                                </sup>
                              </h4>
                              {/* <p className="text-[13px] text-qgray">
                            64GB, Black, 44mm, Chain Belt
                          </p> */}
                            </div>
                            <div>
                              <span className="text-[15px] text-qblack font-medium">
                                €
                                {singlepageDetails?.current_sale_price *
                                  singlepageQuantity}
                              </span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    )}
                  </div>
                  <div className="w-full h-[1px] bg-[#EDEDED]"></div>

                  <div className="mt-[30px]">
                    <div className=" flex justify-between mb-3">
                      <p className="text-[13px] font-medium text-qblack uppercase">
                        SUBTOTAL
                      </p>
                      <p className="text-[15px] font-medium text-qblack uppercase">
                        €
                        {addToCartData?.singleSubTotal
                          ? addToCartData?.singleSubTotal
                          : subTotal}
                      </p>
                    </div>
                    <div className=" flex justify-between mb-3">
                      <p className="text-[13px] font-medium text-qblack uppercase">
                        Discount Coupon
                      </p>
                      <p className="text-[15px] font-medium text-qblack uppercase">
                        -€{addToCartData?.diccountCouponAount}
                      </p>
                    </div>
                  </div>

                  <div className="w-full ">
                    <div className="sub-total mb-3">
                      <div className=" flex justify-between mb-5">
                        <div>
                          <span className="text-[13px] font-medium text-qblack mb-3 block">
                            SHIPPING
                          </span>
                          {/* <p className="text-base font-medium text-qblack">
                            Free Shipping
                          </p> */}
                        </div>
                        <p className="text-[15px] font-medium text-qblack">
                          +€{addToCartData?.shippingCost}
                        </p>
                      </div>
                      <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                    </div>
                  </div>

                  <div className="mt-[30px]">
                    <div className=" flex justify-between mb-5">
                      <p className="text-2xl font-medium text-qblack">Total</p>
                      <p className="text-2xl font-medium text-qred">
                        €
                        {addToCartData?.singleGrandTotal
                          ? addToCartData?.singleGrandTotal
                          : addToCartData?.grandTotal}
                      </p>
                    </div>
                  </div>
                  <div className="shipping mt-[30px]">
                    <p className="text-center mb-4 ">
                      Selet a payment Method<span className="text-qred">*</span>
                    </p>
                    <ul className="flex flex-col space-y-1">
                      <li>
                        <div className="flex space-x-2.5 items-center mb-5">
                          <div className="input-radio">
                            <input
                              type="radio"
                              name="price"
                              className="accent-pink-500"
                              id="delivery"
                              value={1}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                          </div>
                          <label
                            htmlFor="delivery"
                            className="text-[18px] text-normal text-qblack"
                          >
                            Cash on Delivery
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="flex space-x-2.5 items-center mb-5">
                          <div className="input-radio">
                            <input
                              type="radio"
                              name="price"
                              className="accent-pink-500"
                              id="bank"
                              // onClick={()=>setCheckedPaymentMethod(!checkedPaymentMethod)}
                              value={2}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                          </div>
                          <label
                            htmlFor="bank"
                            className="text-[18px] text-normal text-qblack"
                          >
                            Credit/Debit Cards
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                  {paymentMethod === "2" ? (
                    <button
                      onClick={handleStripeOrder}
                      className="w-full h-[50px] bg-rose-600 text-white flex justify-center items-center rounded"
                    >
                      <span className="text-sm font-semibold ">
                        Confirm Order
                      </span>
                    </button>
                  ) : (
                    <Link
                      to="#"
                      onClick={handlePlaceOrder}
                      state={cartDetailsFromAddtoCart}
                    >
                      <button className="w-full h-[50px] bg-rose-600 text-white flex justify-center items-center rounded">
                        <span className="text-sm font-semibold ">
                          Confirm Order
                        </span>
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
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
    </Layout>
  );
}
