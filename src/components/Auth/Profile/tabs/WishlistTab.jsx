import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import {
  useRemoveAllWishListMutation,
  useRemoveSingleWishListMutation,
} from "../../../../features/api/wishlistApi";

export default function WishlistTab({ className }) {
  const userProfile = JSON.parse(localStorage.getItem("user"));
  const userdata = userProfile?.user;
  const googleUser = JSON.parse(localStorage.getItem("googleUser"));
  const googleUserId = googleUser?.user?.id;
  const [list, setList] = useState([]);

  //handle quantity and total
  const handleQuantityChange = (qty, index) => {
    const updatedData = [...list];
    updatedData[index].quantity = qty;
    updatedData[index].total = qty * updatedData[index].current_sale_price;
    setList(updatedData);
  };

  // Fetch wishlist Information
  useEffect(() => {
    fetch(
      `https://www.sultanaboutiques.com/backend/api/show_wishlist/${
        userdata?.id ? userdata?.id : googleUserId
      }`
    )
      .then((res) => res.json())
      .then((data) => setList(data));
  }, []);

  // Delete single Wish List
  const [removeFromWishList] = useRemoveSingleWishListMutation();
  const handleDeleteWishList = async (pId) => {
    const confirm = window.confirm("Are you want do delete?");
    if (confirm) {
      const response = await removeFromWishList(pId);
      // const url = ` https://www.sultanaboutiques.com/backend/api/wishlist_delete/${pId}`;
      // fetch(url, {
      //   method: "DELETE",
      // }).then((res) => res.json());
      const remaining = list.filter((p) => p.id !== pId);
      setList(remaining);

      if (response) {
        swal({
          title: "Successfully Deleted",
          text: "Success",
          icon: "success",
        });
      }
    }
  };

  // Delete total wish list by userId
  const [removeAllWishList] = useRemoveAllWishListMutation();
  const handleCleanAllWishList = (e) => {
    const confirm = window.confirm("Are you want do delete?");
    if (confirm) {
      const response = removeAllWishList(
        userdata?.id ? userdata?.id : googleUserId
      );
      // const url = ` https://www.sultanaboutiques.com/backend/api/all_wishlist_delete/${uId}`;
      // fetch(url, {
      //   method: "DELETE",
      // }).then((res) => res.json());

      swal({
        title: "Successfully Deleted",
        text: "Success",
        icon: "success",
      });
    }
  };

  return (
    <>
      <div className={`w-full ${className || ""}`}>
        <div className=" relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-[13px] font-medium text-white bg-qh2-green border-b default-border-bottom uppercase">
              {/* table heading */}
              <tr>
                <td className="py-4 pl-10 block whitespace-nowrap min-w-[300px]">
                  product
                </td>
                {/* <td className="py-4 whitespace-nowrap text-center">color</td> */}
                {/* <td className="py-4 whitespace-nowrap text-center">size</td> */}
                <th scope="col" className="text-center px-6 py-3">
                  price
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
            </thead>
            {/* table heading end */}
            {list?.map((wl, i) => (
              <tr key={i} className="bg-white border-b hover:bg-gray-50">
                <td className="pl-10  py-4  w-[380px]">
                  <div className="flex space-x-6 items-center">
                    <div className="w-[80px] h-[80px] overflow-hidden flex justify-center items-center border border-[#EDEDED]">
                      <img
                        src={`https://sultanaboutiques.com/backend/${wl?.image_path}`}
                        alt="product"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <p className="font-medium text-[15px]  text-qblack">
                        {wl?.name}
                      </p>

                      <p className="flex">
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
                      </p>
                    </div>
                  </div>
                </td>

                <td className="text-center py-4 px-2">
                  <div className="flex space-x-1 items-center justify-center">
                    <span className="text-[15px] font-normal">
                      {wl?.current_sale_price}
                    </span>
                  </div>
                </td>
                <td className=" py-4">
                  <div className="flex justify-center items-center">
                    <input
                      type="number"
                      className="border text-center w-16"
                      defaultValue={1}
                      min={1}
                      onChange={(e) => handleQuantityChange(+e.target.value, i)}
                    />
                  </div>
                </td>
                <td className="text-right py-4">
                  <div className="flex space-x-1 items-center justify-center">
                    <span className="text-[15px] font-normal">
                      {+wl?.current_sale_price * wl?.quantity}
                    </span>
                  </div>
                </td>
                <td className="text-right py-4">
                  <div className="flex space-x-1 items-center justify-center">
                    <span
                      onClick={() => handleDeleteWishList(wl?.id)}
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
            ))}
          </table>
        </div>
      </div>
      <div className="w-full mt-[30px] flex sm:justify-end justify-start">
        <div className="sm:flex sm:space-x-[30px] items-center">
          <button type="button" onClick={handleCleanAllWishList}>
            <div className="w-full text-sm font-semibold text-qred mb-5 sm:mb-0">
              Clean Wishlist
            </div>
          </button>
          <div className="w-[180px] h-[50px]">
            <button
              type="submit"
              className="bg-rose-600 rounded h-[50px] w-44 text-white"
            >
              <div className="w-full text-sm font-semibold">Add to Cart</div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
