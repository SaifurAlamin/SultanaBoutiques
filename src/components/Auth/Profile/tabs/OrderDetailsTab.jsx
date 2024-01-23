import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function OrderDetailsTab() {
  const location = useLocation();
  const pId = location?.state;

  const [orderDetails, setOrderDetails] = useState({});
  console.log(orderDetails);

  const userProfile = JSON.parse(localStorage.getItem("user"));
  const userdata = userProfile?.user;

  const checkoutDetails = JSON.parse(localStorage.getItem("checkoutDetails"));

  const checkOutInfo = JSON.parse(localStorage.getItem("orderDetailsInfo"));
  // const totalAmount = orderDetails?.order_details?.map(item=>item?.)
  const O_details = orderDetails?.order_details;

  const ud = orderDetails?.user_details;
  const username = ud?.user_name;
  const userphone = ud?.user_phone;
  const useremail = ud?.user_email;

  useEffect(() => {
    fetch(
      `https://www.sultanaboutiques.com/backend/api/orderDetails/${
        pId ? pId : checkOutInfo?.data?.order_id
      }`
    )
      .then((res) => res.json())
      .then((data) => setOrderDetails(data));
  }, [checkOutInfo?.data?.order_id, pId]);

  return (
    <div className="changePasswordTab w-full">
      <h2 className="text-gray-900 text-center bg-success mb-3 font-semibold bg-gray-50 rounded p-2">
        ORDER ID: {orderDetails?.order_number}
      </h2>

      <div className="xl:flex xl:space-x-[30px] mt-5 mb-[30px]">
        <div className="xl:w-1/2 w-full rounded italic h-[240px] flex flex-col item justify-center bg-gray-50 p-5">
          <p className="text-[18px] text-gray-900  text-start font-semibold">
            Shipping Address
          </p>
          <p className="text-sm text-gray-900 leading-[30px] text-left">
            Name: {username ? username : userdata?.name} <br />
            Shipping Address: {orderDetails?.billing_address}
            <br />
            {orderDetails?.billing_provenance
              ? `Billing Provennce: ${orderDetails?.billing_provenance}`
              : ""}
            {orderDetails?.billing_provenance ? <br /> : ""}
            Shipping City : {orderDetails?.billing_city}
            <br />
            Shipping Post Code: {orderDetails?.billing_postal_code}
            <br />
            Mobile: {userphone ? userphone : orderDetails?.billing_phone_number}
          </p>
        </div>
        <div className="xl:w-1/2 w-full text-gray-900 rounded  h-[240px] flex flex-col item justify-center bg-gray-50 p-5 mt-4 lg:mt-0">
          <p className="text-[18px] text-gray-900   text-start font-semibold">
            Order Summary
          </p>
          <p className="text-[15px] text-gray-900 leading-[30px] text-left">
            Sub Total: €{" "}
            {+orderDetails?.total_amount +
              +orderDetails?.coupon_discount -
              +orderDetails?.shipping_cost}
            <br />
            Delivery Charge: €
            {orderDetails?.shipping_cost ? orderDetails?.shipping_cost : 0}
            <br />
            Coupon Discount : -€
            {orderDetails?.coupon_discount ? orderDetails?.coupon_discount : 0}
            <br />
            {/* Coupon Discount : -€{orderDetails?.coupon_discount}  // Discount badei total amount dekay
            <br /> */}
            Total : €{orderDetails?.total_amount}
            <br />
            Paid: €
            {orderDetails?.payment_method_id === "2" ||
            orderDetails?.status === "7"
              ? orderDetails?.total_amount
              : 0}
            <br />
            Due : €
            {orderDetails?.payment_method_id !== "2" &&
            orderDetails?.status !== "7"
              ? orderDetails?.total_amount
              : 0}
            <br />
            <span
              className={`${
                orderDetails?.status === "7"
                  ? "text-green-500"
                  : orderDetails?.status === "1"
                  ? "text-yellow-400"
                  : "text-gray-900"
              } `}
            >
              Status :{" "}
              {orderDetails?.status === "1"
                ? "Pending"
                : orderDetails?.status === "2"
                ? "Processing"
                : orderDetails?.status === "3"
                ? "On the Way"
                : orderDetails?.status === "4"
                ? "Cancel Requsted"
                : orderDetails?.status === "5"
                ? "Order Cancel Accepted"
                : orderDetails?.status === "6"
                ? "Cancel Process Completed"
                : orderDetails?.status === "7"
                ? "Completed"
                : ""}
            </span>
          </p>
        </div>
      </div>

      {/* <div className="xl:w-1/2 w-full text-gray-900 rounded  h-[full] flex flex-col item justify-center bg-[#00796B] p-3">
          <p className="text-[18px] text-gray-900   text-start font-semibold">
            Product Details
          </p>
          {orderDetails?.order_details?.map((od, i) => (
            <p className="flex items-center">
              <span className=" w-full ">Name : {od?.product_name}</span>

              <span className=" w-full ">
                Price : €{od?.product_price * od?.product_qty}
              </span>
            </p>
          ))}
          <p className="ml-[180px]">
            Discount: €
            {orderDetails?.coupon_discount
              ? orderDetails?.coupon_discount
              : "0"}
          </p>
          <p className="ml-[180px]">------------------------</p>
          <p className="ml-[180px]">Total: €{orderDetails?.total_amount}</p>
        </div> */}

      {/* <div className="xl:w-1/2 w-full text-gray-900 rounded  h-[full] flex flex-col item  bg-[#00796B] p-3">
          <p className="text-[18px] text-gray-900   text-start font-semibold">
            Order History
          </p>

          <p className="text-start">Pending</p>
        </div> */}

      <div className="relative w-full overflow-x-auto border border-[#EDEDED]">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            {/* table heading */}
            <tr className="text-[13px] font-medium text-black bg-[#F6F6F6] whitespace-nowrap px-2 border-b default-border-bottom uppercase">
              <td className="py-4  whitespace-nowrap text-center ">Product</td>

              <td className="py-4 whitespace-nowrap  text-center">Quantity</td>
              <td className="py-4 whitespace-nowrap  text-center">Total</td>
            </tr>
            {/* table heading end */}
            {orderDetails?.order_details?.map((item, i) => (
              <tr key={i} className="bg-white border-b hover:bg-gray-50">
                <td className="pl-10  py-2 w-[280px]">
                  <div className="flex space-x-6 items-center">
                    <div className="w-[70px] h-[70px] overflow-hidden rounded-full flex justify-center items-center border border-[#EDEDED]">
                      <img
                        src={`https://sultanaboutiques.com/backend/${item?.image_path}`}
                        alt="product"
                        className="w-[80px] h-[80px] rounded-full"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <p className="text-[15px] font-normal">
                        {item?.product_name}
                      </p>

                      {/* <p className="flex">
                          <span className="text-[12px] font-normal">
                            {" "}
                            Size: {wl?.size}{" "}
                          </span>
                          <span className="ml-2 text-[12px] font-normal">
                            {" "}
                            Color:
                          </span>
                          <span
                            style={{ background: wl?.color }}
                            className="ml-1 text-[12px] mt-1 font-normal w-[15px] h-[15px]  block rounded-full border"
                          ></span>
                        </p> */}
                    </div>
                  </div>
                </td>

                {/* <td className="text-center py-4 px-2">
                  <div className="flex space-x-1 items-center justify-center">
                    <span className="text-[15px] font-normal">
                      {od?.product_name}
                    </span>
                  </div>
                </td> */}
                <td className="text-center py-4 px-2">
                  <div className="flex space-x-1 items-center justify-center">
                    <span className="text-[15px] font-normal">
                      {item?.product_qty}
                    </span>
                  </div>
                </td>
                <td className="text-center py-4 px-2">
                  <div className="flex space-x-1 items-center justify-center">
                    <span className="text-[15px] font-normal">
                      €{item?.product_price * item?.product_qty}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center mt-4">
        <Link to="/all-products">
          <button
            type="submit"
            className="w-[100px] lg:w-[180px] justify-content-center h-[40px] lg:h-[50px] bg-rose-600 text-white text-sm rounded"
          >
            Continue->
          </button>
        </Link>
      </div>
    </div>
  );
}
