import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Layout from "../../Partials/LayoutHomeTwo";
import Thumbnail from "./Thumbnail";

export default function VerifyEmail() {
  const [email, setMail] = useState("");
  const [password, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Access the 'token' query parameter from the URL
  const token = searchParams.get("token");

  // Now 'token' contains the value from the URL

  const handleVerifyEmail = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://www.sultanaboutiques.com/backend/api/verify-email",
        {
          token,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      console.log(response);
      if (response?.data?.status === 200) {
        navigate("/login");
      }
      toast(response?.data?.msg);
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
                    Verify Email
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
                  <form onSubmit={handleVerifyEmail}>
                    <div class="flex flex-wrap -mx-3 mb-6">
                      <div class="w-full px-3"></div>
                    </div>

                    <div className="signin-area mb-3.5">
                      <div className="flex justify-center">
                        <button
                          type="submit"
                          className="bg-green-800 rounded  text-sm text-white w-full h-[50px] font-semibold flex justify-center bg-purple items-center"
                        >
                          <span>Verify</span>
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
