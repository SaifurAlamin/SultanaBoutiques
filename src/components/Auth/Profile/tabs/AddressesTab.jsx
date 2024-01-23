import React from "react";

export default function AddressesTab() {
  const userProfile = JSON.parse(localStorage.getItem("user"));
  const googleUser = JSON.parse(localStorage.getItem("googleUser"));
  const userdata = userProfile?.user;
  const googleUserData = googleUser?.user;
  return (
    <>
      <div className="grid grid-cols-1 gap-[30px]">
        <div className="w-full bg-primarygray p-5 border items-center mx-auto justify-center">
          <div className="flex justify-between items-center">
            <p className="title text-[22px] font-semibold">Address</p>
          </div>
          <div className="mt-5">
            <table>
              <tbody>
                <tr className="flex mb-3">
                  <td className="text-base text-qgraytwo w-[70px] block line-clamp-1">
                    <div>Name:</div>
                  </td>
                  <td className="text-base text-qblack line-clamp-1 font-medium">
                    {userdata?.name ? userdata?.name : googleUserData?.name}
                  </td>
                </tr>
                <tr className="flex mb-3">
                  <td className="text-base text-qgraytwo w-[70px] block line-clamp-1">
                    <div>Email:</div>
                  </td>
                  <td className="text-base text-qblack line-clamp-1 font-medium">
                    {userdata?.email ? userdata?.email : googleUserData?.email}
                  </td>
                </tr>
                <tr className="flex mb-3">
                  <td className="text-base text-qgraytwo w-[70px] block line-clamp-1">
                    <div>Phone:</div>
                  </td>
                  <td className="text-base text-qblack line-clamp-1 font-medium">
                    {userdata?.phone ? userdata?.phone : googleUserData?.phone}
                  </td>
                </tr>

                <tr className="flex mb-3">
                  <td className="text-base text-qgraytwo w-[70px] block line-clamp-1">
                    <div>Address</div>
                  </td>
                  <td className="text-base text-qblack line-clamp-1 font-medium">
                    {userdata?.address}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
