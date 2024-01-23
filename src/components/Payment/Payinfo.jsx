import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/LayoutHomeTwo";
export default function Payinfo() {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState({});
  const ud = orderDetails?.user_details;
  const username = ud?.user_name;
  const userphone = ud?.user_phone;
  const useremail = ud?.user_email;

  useEffect(() => {
    fetch(`https://www.sultanaboutiques.com/backend/api/orderDetails/${id}`)
      .then((res) => res.json())
      .then((data) => setOrderDetails(data));
  }, []);

  return (
    <Layout childrenClasses="pt-0 pb-0 px-48">
      <div className="page-title mb-10">
        <PageTitle
          title="Order Details Information"
          breadcrumb={[
            { name: "home", path: "/" },
            { name: "Order Details Information", path: "/pay-info" },
          ]}
        />
      </div>
      <div className="changePasswordTab w-full">
        <h2 className="text-white text-center bg-success mb-3 font-semibold bg-[#00695C] rounded p-2">
          ORDER ID: {orderDetails?.order_number}
        </h2>

        <div className="xl:flex xl:space-x-[30px] mt-5 mb-[30px]">
          <div className="xl:w-1/2 w-full rounded  h-[240px] flex flex-col item justify-center bg-[#00796B] p-5">
            <p className="text-[18px] text-white  text-start font-semibold">
              Shipping Address
            </p>
            <p className="text-[15px] text-white leading-[30px] text-left">
              Name: {username} <br />
              Billing Address: {orderDetails?.billing_address}
              <br />
              Billing City : {orderDetails?.billing_city}
              <br />
              Billing Post Code: {orderDetails?.billing_postal_code}
              <br />
              Total Amount: {orderDetails?.total_amount}
              <br />
              Mobile: {userphone}
            </p>
          </div>
          <div className="xl:w-1/2 w-full text-white rounded  h-[240px] flex flex-col item justify-center bg-[#00796B] p-5">
            <p className="text-[18px] text-white   text-start font-semibold">
              Billing Address
            </p>
            <p className="text-[15px] text-white leading-[30px] text-left">
              Name: {username} <br />
              Shipping Address: {orderDetails?.shipping_address}
              <br />
              Shipping City : {orderDetails?.shipping_city}
              <br />
              Shipping Post Code: {orderDetails?.shipping_postal_code}
              <br />
              Coupon Discount: {orderDetails?.coupon_discount}
              <br />
              Mobile: {userphone}
            </p>
          </div>
        </div>

        <div className="text-center mb-5">
          <Link to={"/profile"}>
            <button
              type="submit"
              className="w-[204px] justify-content-center h-[50px] bg-[#004D40] text-white text-sm rounded"
            >
              Go to Dashboard->
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
