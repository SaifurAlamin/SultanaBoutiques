import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function SingleOrderDetails() {
  const location = useLocation();
  const pId = location?.state;

  const [orderDetails, setOrderDetails] = useState({});

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
            Shipping City : {orderDetails?.billing_city}
            <br />
            Shipping Post Code: {orderDetails?.billing_postal_code}
            <br />
            Mobile: {userphone}
          </p>
        </div>
        <div className="xl:w-1/2 w-full text-gray-900 rounded  h-[240px] flex flex-col item justify-center bg-gray-50 p-5 mt-4 lg:mt-0">
          {/* <div className="flex justify-center mb-3 ">
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22 43C33.598 43 43 33.598 43 22C43 10.402 33.598 1 22 1C10.402 1 1 10.402 1 22C1 33.598 10.402 43 22 43ZM22 44C34.1503 44 44 34.1503 44 22C44 9.84974 34.1503 0 22 0C9.84974 0 0 9.84974 0 22C0 34.1503 9.84974 44 22 44Z"
                fill="#FFBB38"
              />
              <path
                d="M11.0183 18.6455C11.2024 18.761 11.3464 18.8458 11.4851 18.9382C14.2825 20.8029 17.0792 22.6676 19.8759 24.5331C21.3894 25.5429 22.6125 25.5413 24.1329 24.5277C26.9304 22.663 29.7271 20.7975 32.5237 18.9328C32.6539 18.8465 32.7856 18.7634 32.9659 18.6478C32.9782 18.8042 32.9959 18.9212 32.9959 19.0391C32.9974 22.1169 32.9997 25.1939 32.9959 28.2718C32.9944 29.6582 32.1625 30.4854 30.773 30.4862C24.9186 30.4877 19.0641 30.4877 13.2096 30.4862C11.8456 30.4854 11.0037 29.6543 11.0022 28.3003C10.9983 25.2086 11.0006 22.1169 11.0014 19.0245C11.0022 18.9151 11.0114 18.8065 11.0183 18.6455Z"
                fill="#FFBB38"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.001 19.8174C11.001 19.7663 11.001 19.7152 11.001 19.6641C11.001 19.6641 11.001 19.664 11.001 19.664C11.0011 19.4508 11.0011 19.2376 11.0012 19.0245C11.0017 18.9566 11.0054 18.889 11.0098 18.8091C11.0126 18.7601 11.0155 18.7066 11.0181 18.6455C11.0841 18.6869 11.1449 18.7243 11.2021 18.7596C11.3047 18.8227 11.3959 18.8789 11.4849 18.9382M11.6145 19.0246C11.6167 19.026 11.6188 19.0274 11.6209 19.0288C11.7476 19.1133 11.8744 19.1978 12.0011 19.2823C12.001 19.6829 12.0009 20.0834 12.0008 20.4839C11.6675 20.2617 11.3342 20.0396 11.001 19.8174M19.3208 25.365C16.881 23.7376 14.4411 22.1107 12.0008 20.4839C12.0007 20.616 12.0007 20.7482 12.0006 20.8803C11.9998 23.3541 11.9989 25.8265 12.002 28.299L12.002 28.2991C12.0025 28.7664 12.1435 29.0368 12.2981 29.1898C12.4539 29.344 12.7318 29.4858 13.2097 29.4862L13.2094 30.4862L13.21 29.4862C13.2099 29.4862 13.2098 29.4862 13.2097 29.4862C19.064 29.4877 24.9183 29.4877 30.7726 29.4862L30.7728 30.4829L30.7723 29.4862C30.7724 29.4862 30.7725 29.4862 30.7726 29.4862C31.2688 29.4858 31.5467 29.3418 31.6992 29.1899C31.8512 29.0386 31.9952 28.7634 31.9957 28.2707L31.9957 28.2705C31.999 25.6758 31.9978 23.0816 31.9965 20.4862C32.3297 20.264 32.6629 20.0418 32.9961 19.8196C32.9961 19.7617 32.996 19.7037 32.996 19.6457C32.996 19.6443 32.996 19.6428 32.996 19.6414C32.9959 19.4406 32.9958 19.2399 32.9957 19.0391C32.9957 18.9617 32.9881 18.8846 32.9793 18.7965C32.9748 18.7505 32.9699 18.7014 32.9657 18.6478C32.9212 18.6763 32.8797 18.7029 32.8404 18.728C32.7205 18.8046 32.6216 18.8678 32.5236 18.9328C32.4704 18.9682 32.4173 19.0037 32.3641 19.0391C32.364 19.0392 32.3638 19.0393 32.3637 19.0394C32.2411 19.1212 32.1184 19.2029 31.9958 19.2847C31.996 19.545 31.9961 19.8053 31.9962 20.0655C31.9963 20.2057 31.9964 20.346 31.9965 20.4862C31.3081 20.9452 30.6197 21.4042 29.9313 21.8633C28.1836 23.0288 26.4356 24.1945 24.6874 25.3598L24.1327 24.5277L24.6874 25.3598C24.6874 25.3598 24.6874 25.3598 24.6874 25.3598C23.8278 25.9329 22.9502 26.288 22.0029 26.2892C21.055 26.2904 20.1783 25.9371 19.3208 25.365ZM19.3208 25.365L19.8742 24.5353L19.3207 25.365C19.3207 25.365 19.3208 25.365 19.3208 25.365ZM11.4849 18.9382C11.5281 18.967 11.5713 18.9958 11.6145 19.0246L11.4849 18.9382Z"
                fill="#FFBB38"
              />
              <path
                d="M22.0007 14.0029C24.963 14.0029 27.9261 13.9983 30.8883 14.0052C32.1292 14.0083 33.0427 14.9295 32.9934 16.1149C32.9633 16.8296 32.5944 17.3418 32.0082 17.7308C29.4226 19.4476 26.8424 21.1722 24.2598 22.8944C23.8793 23.1485 23.5042 23.4112 23.1145 23.6515C22.3766 24.1075 21.6133 24.1275 20.8901 23.6492C17.8839 21.6605 14.8862 19.6594 11.8915 17.6538C11.1213 17.1377 10.8333 16.2889 11.0936 15.4378C11.3547 14.5837 12.1288 14.0068 13.07 14.0045C15.889 13.9968 18.7088 14.0014 21.5278 14.0014C21.6857 14.0029 21.8436 14.0029 22.0007 14.0029Z"
                fill="#FFBB38"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M32.0082 17.7308C32.5944 17.3418 32.9633 16.8296 32.9934 16.1149C33.0427 14.9295 32.1292 14.0083 30.8883 14.0052C28.7724 14.0003 26.6561 14.0012 24.5399 14.0022C23.6935 14.0025 22.8471 14.0029 22.0007 14.0029C21.8436 14.0029 21.6857 14.0029 21.5278 14.0014C20.759 14.0014 19.9902 14.001 19.2213 14.0007C17.1709 13.9998 15.1202 13.9989 13.07 14.0045C12.1288 14.0068 11.3547 14.5837 11.0936 15.4378C10.8333 16.2889 11.1213 17.1377 11.8915 17.6538C14.8862 19.6594 17.8839 21.6605 20.8901 23.6492C21.6133 24.1275 22.3766 24.1075 23.1145 23.6515C23.3977 23.4769 23.6732 23.2904 23.9487 23.104C24.0523 23.0339 24.1558 22.9638 24.2598 22.8944C24.9163 22.4566 25.5726 22.0186 26.229 21.5807C28.1545 20.2959 30.0799 19.0112 32.0082 17.7308ZM21.4417 22.8151C21.6574 22.9577 21.8376 23.0016 21.9909 23.0007C22.1486 22.9998 22.3464 22.9506 22.5888 22.8008L22.5896 22.8003C22.8536 22.6375 23.1029 22.4688 23.3716 22.287C23.4787 22.2145 23.5889 22.1399 23.7043 22.0628L23.705 22.0624C24.3607 21.6251 25.0165 21.1875 25.6725 20.7499C27.5985 19.4647 29.5255 18.179 31.4551 16.8977L31.4553 16.8976C31.8444 16.6394 31.9808 16.3923 31.9942 16.0729C32.0181 15.4929 31.5978 15.0071 30.886 15.0052M21.4417 22.8151C18.4378 20.8279 15.4419 18.8281 12.4482 16.823L21.4417 22.8151ZM12.0499 15.7302L12.0499 15.7303C11.9179 16.1618 12.0459 16.5534 12.448 16.8229M13.0727 15.0045L13.0724 15.0045C12.5581 15.0057 12.1793 15.3069 12.0499 15.7302M24.5417 15.0022C23.695 15.0025 22.848 15.0029 22.0007 15.0029H21.9984C21.8444 15.0029 21.6841 15.0029 21.523 15.0014C20.7548 15.0014 19.987 15.001 19.2194 15.0007C17.1695 14.9998 15.1212 14.9989 13.0727 15.0045M24.5417 15.0022C26.6573 15.0012 28.7714 15.0003 30.8859 15.0052L24.5417 15.0022Z"
                fill="#FFBB38"
              />
            </svg>
          </div> */}
          {/* ==== Billing Address Postponded ==== */}
          {/* <p className="text-[18px] text-gray-900   text-start font-semibold">
            Billing Address
          </p>
          <p className="text-[15px] text-gray-900 leading-[30px] text-left">
            Name: {username} <br />
            Billing Address: {orderDetails?.billing_address}
            <br />
            Billing City : {orderDetails?.billing_city}
            <br />
            Billing Post Code: {orderDetails?.billing_postal_code}
            <br />
            Coupon Discount: {orderDetails?.coupon_discount}
            <br />
            Mobile: {userphone}
          </p> */}
          <p className="text-[18px] text-gray-900   text-start font-semibold">
            Order Summary
          </p>
          <p className="text-[15px] italic text-gray-900 leading-[30px] text-left">
            Sub Total: €{orderDetails?.total_amount}
            <br />
            {/* Coupon Discount : -€{orderDetails?.coupon_discount} 
            <br /> */}
            Delivery Charge: €0
            <br />
            Total : €{orderDetails?.total_amount}
            <br />
            Paid: €{orderDetails?.total_amount}
            <br />
            Due : €00
          </p>{" "}
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
        <button
          type="submit"
          className="w-[100px] lg:w-[180px] justify-content-center h-[40px] lg:h-[50px] bg-qh2-green text-white text-sm rounded"
        >
          Continue->
        </button>
      </div>
    </div>
  );
}
