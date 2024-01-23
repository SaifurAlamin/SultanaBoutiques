import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function OrderTab() {
  const [orderList, setOrderList] = useState([]);

  const userProfile = JSON.parse(localStorage.getItem("user"));
  const userId = userProfile?.user?.id;
  const googleUser = JSON.parse(localStorage.getItem("googleUser"));
  const [cancelOrder, setCanceOrder] = useState({});
  const [isClick, setIsClick] = useState(null);

  useEffect(() => {
    fetch(
      `https://www.sultanaboutiques.com/backend/api/SingleOrderlist/${
        userId ? userId : googleUser?.user?.id
      }`
    )
      .then((res) => res.json())
      .then((data) => setOrderList(data));
  }, []);

  //handle cancel order Only accepted in Pending order
  const handleCancelOrder = async (oId, status) => {
    const confirm = window.confirm("Are You sure to cancel order?");
    if (confirm) {
      try {
        const response = await axios.get(
          `https://www.sultanaboutiques.com/backend/api/ordercancel/${oId}`
        );
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <div className="relative w-full overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            {/* table heading */}
            <tr className="text-base text-qgray whitespace-nowrap px-2 border-b default-border-bottom ">
              <td className="py-4 block whitespace-nowrap text-center">
                Order
              </td>
              <td className="py-4 whitespace-nowrap text-center">Date</td>
              <td className="py-4 whitespace-nowrap text-center">Status</td>
              <td className="py-4 whitespace-nowrap text-center">Amount</td>
              <td className="py-4 whitespace-nowrap  text-center">Action</td>
            </tr>
            {/* table heading end */}
            {orderList?.map((l) => (
              <tr className="bg-white border-b hover:bg-gray-50">
                <td className="text-center py-4">
                  <span className=" text-base lg:text-lg text-qgray font-medium">
                    #OR{l?.order_number}
                  </span>
                </td>
                <td className="text-center py-4 px-2">
                  <span className="text-base text-qgray  whitespace-nowrap">
                    {l?.created_at.slice(0, 10)}
                  </span>
                </td>
                <td className="flex flex-col py-4 px-2 gap-y-1">
                  <button
                    className={` text-xs lg:text-sm rounded w-32 lg:w-48 block mx-auto ${
                      l?.status === "6"
                        ? "text-white bg-qred text-xs disabled:opacity-25"
                        : l?.status === "7"
                        ? "bg-green-600 text-white "
                        : l?.status === "4"
                        ? "text-qyellow"
                        : l?.status === "5"
                        ? "text-rose-700 text-xs"
                        : "text-green-500"
                    } bg-green-100 p-2`}
                    disabled
                  >
                    {l?.status === "1"
                      ? "Pending"
                      : l?.status === "2"
                      ? "Processing"
                      : l?.status === "3"
                      ? "On the Way"
                      : l?.status === "4"
                      ? "Cancel Requsted"
                      : l?.status === "5"
                      ? "Order Cancel Accepted"
                      : l?.status === "6"
                      ? "Cancel Process Completed"
                      : l?.status === "7"
                      ? "Completed"
                      : ""}
                  </button>
                  <span>
                    {l.status === "1" ? (
                      <button
                        title="Cancel pending order ?"
                        className={`text-qred text-sm fony-bold block mx-auto`}
                        onClick={() => handleCancelOrder(l?.id, l?.status)}
                      >
                        Cancel
                      </button>
                    ) : (
                      ""
                    )}
                  </span>
                </td>
                <td className="text-center py-4 px-2">
                  <span className="text-base text-qblack whitespace-nowrap px-2 ">
                    €{l?.total_amount}
                  </span>
                </td>
                <td className="text-center py-4">
                  <Link to="/profile#review" state={l?.id}>
                    <button
                      type="button"
                      className="w-[86px] h-[36px] bg-qyellow text-slate-200 rounded "
                    >
                      View Details
                    </button>
                  </Link>
                  {/* <button
                    onClick={() => handleCancelOrder(l?.id)}
                    title="Cancel order ?"
                    type="button"
                    className=" ml-2 w-[86px] h-[36px] bg-qred text-white rounded"
                  >
                    Cancel
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
