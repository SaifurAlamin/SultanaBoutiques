import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PasswordSvg from "./PasswordSvg";

export default function PasswordTab() {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const userProfile = JSON.parse(localStorage.getItem("user"));

  const handleChangePass = async (e) => {
    e.preventDefault();

    const data = {
      currentPass: oldPass,
      newPass: newPass,
    };

    try {
      const response = await axios.post(
        `https://www.sultanaboutiques.com/backend/api/user/changePassword`,
        data,
        {
          headers: {
            Authorization: `Bearer ${userProfile?.token}`,
          },
        }
      );

      toast(response?.data?.msg);
    } catch (error) {
      console.log(error);
    }
  };
  //Show Pass
  const handleShowOldPass = () => setShowOldPass((show) => !show);

  const handleShowNewPass = () => setShowNewPass((show) => !show);
  return (
    <div className="changePasswordTab w-full mx-auto">
      <div className="w-full flex xl:flex-row flex-col-reverse space-x-5 xl:items-center">
        <div className="lg:w-[397px] mb-10">
          <div className="input-field mb-6">
            <label
              className="input-label text-qgray text-sm block mb-2.5"
              htmlFor="old_password"
            >
              Current Password*
            </label>
            <div className="input-wrapper border border-[#E8E8E8] w-full  h-[58px] overflow-hidden relative">
              <input
                placeholder="Current Password"
                className="input-field placeholder:text-base text-bese px-4 text-dark-gray w-full h-full bg-[#FAFAFA] focus:ring-0 focus:outline-none rounded"
                type={showOldPass ? "text" : "password"}
                id="old_password"
                onChange={(e) => setOldPass(e.target.value)}
              />
              <div
                className="absolute top-1/2 right-0 mr-2 transform -translate-y-1/2 text-gray-900 text-xl cursor-pointer"
                onClick={handleShowOldPass}
              >
                {!showOldPass ? (
                  <i class="fa-solid fa-eye-slash opacity-60"></i>
                ) : (
                  <i class="fa-regular fa-eye opacity-75"></i>
                )}
              </div>
            </div>
          </div>
          <div className="input-field mb-6">
            <label
              className="input-label text-qgray text-sm block mb-2.5"
              htmlFor="old_password"
            >
              New Password*
            </label>
            <div className="input-wrapper border border-[#E8E8E8] w-full  h-[58px] overflow-hidden relative ">
              <input
                placeholder="New Password"
                className="input-field placeholder:text-base text-bese px-4 text-dark-gray w-full h-full bg-[#FAFAFA] focus:ring-0 focus:outline-none rounded"
                type={showNewPass ? "text" : "password"}
                id="new_password"
                onChange={(e) => setNewPass(e.target.value)}
              />
              <div
                className="absolute top-1/2 right-0 mr-2 transform -translate-y-1/2 text-gray-900 text-xl cursor-pointer"
                onClick={handleShowNewPass}
              >
                {!showNewPass ? (
                  <i class="fa-solid fa-eye-slash opacity-60"></i>
                ) : (
                  <i class="fa-regular fa-eye opacity-75"></i>
                )}
              </div>
            </div>
          </div>

          <div className="w-full mt-[30px] flex justify-start">
            <div className="flex space-x-2 items-center">
              <Link to="/profile#dashboard">
                <button type="button">
                  <div className="w-full text-sm font-semibold text-qred mb-5 sm:mb-0">
                    Cancel
                  </div>
                </button>
              </Link>
              <div className="w-[180px] h-[50px]">
                <button
                  type="submit"
                  className="bg-rose-600 rounded h-[40px] lg:h-[50px] w-36 lg:w-48 text-white"
                  onClick={handleChangePass}
                >
                  <div className="w-full text-sm lg:font-semibold">
                    Update Password
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 sm:flex hidden justify-end">
          <PasswordSvg />
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
