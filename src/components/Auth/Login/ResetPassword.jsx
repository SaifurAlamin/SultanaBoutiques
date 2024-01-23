import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Layout from "../../Partials/LayoutHomeTwo";
import Thumbnail from "./Thumbnail";

export default function ResetPassword() {
  const [email, setMail] = useState("");
  const [password, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  console.log(searchParams);

  // Access the 'token' query parameter from the URL
  const token = searchParams.get("token");
  console.log(token);

  // Now 'token' contains the value from the URL

  const handleResetPass = async (e) => {
    e.preventDefault();

    const data = {
      // email,
      password,
      token,
    };

    try {
      const response = await axios.post(
        `https://www.sultanaboutiques.com/backend/api/reset-password`,
        data
        // {
        //   headers: {
        //     Authorization: `Bearer ${userProfile?.token}`,
        //   },
        // }
      );

      toast(" Successfully Reseted");
    } catch (error) {
      toast(error?.response?.data?.error);
    }
  };

  const handleShowPass = () => setShowPassword((show) => !show);
  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="login-page-wrapper w-full py-10">
        <div className="container-x mx-auto">
          <div className="lg:flex items-center relative">
            <div className="lg:w-[572px] w-full h-[783px] bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0]">
              <div className="w-full">
                <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
                  <h1 className="text-[34px] font-bold leading-[74px] text-qblack">
                    Reset Your Password
                  </h1>
                  <div className="shape -mt-6">
                    <svg
                      width="172"
                      height="29"
                      viewBox="0 0 172 29"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 5.08742C17.6667 19.0972 30.5 31.1305 62.5 27.2693C110.617 21.4634 150 -10.09 171 5.08727"
                        stroke="#FFBB38"
                      />
                    </svg>
                  </div>
                </div>
                <div className="input-area">
                  <form onSubmit={handleResetPass}>
                    <div class="flex flex-wrap -mx-3 mb-6">
                      <div class="w-full px-3">
                        {/* <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          for="grid-password"
                        >
                          Email
                        </label> */}
                        {/* <input
                          required
                          placeholder="Enter Your Email Address"
                          name="email"
                          type="email"
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          onChange={(e) => setMail(e.target.value)}
                        /> */}
                        <div className="relative">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-password"
                          >
                            New Password
                          </label>
                          <div className="relative">
                            <input
                              required
                              placeholder="Password"
                              name="password"
                              type={showPassword ? "text " : "password"}
                              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              onChange={(e) => setPass(e.target.value)}
                            />
                            <div
                              className="absolute top-1/2 right-0 mr-2 transform -translate-y-1/2 text-gray-900 text-xl cursor-pointer"
                              onClick={handleShowPass}
                            >
                              {!showPassword ? (
                                <i class="fa-solid fa-eye-slash opacity-60"></i>
                              ) : (
                                <i class="fa-regular fa-eye opacity-75"></i>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="signin-area mb-3.5">
                      <div className="flex justify-center">
                        <button
                          type="submit"
                          className="bg-gray-900 rounded  text-sm text-white w-full h-[50px] font-semibold flex justify-center bg-purple items-center"
                        >
                          <span>Reset</span>
                        </button>
                      </div>
                    </div>
                  </form>
                  <div className="signup-area flex justify-center">
                    <p className="text-base text-qgraytwo">
                      <Link to="/login" className="ml-2 text-blue-600">
                        Back to Login
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 lg:flex hidden transform scale-60 xl:scale-100   xl:justify-center ">
              <div
                className="absolute xl:-right-20 -right-[138px]"
                style={{ top: "calc(50% - 258px)" }}
              >
                <Thumbnail />
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
