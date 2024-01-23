import { Link } from "react-router-dom";
import fb from "../../../assets/logo/facebook.png";
import instra from "../../../assets/logo/instagram.png";
import yt from "../../../assets/logo/youtube.png";

export default function Footer() {
  var s1 = document.createElement("script"),
    s0 = document.getElementsByTagName("script")[0];
  s1.async = true;
  s1.src = "https://embed.tawk.to/65636031ba9fcf18a80f022b/1hg62vh0j";
  s1.charset = "UTF-8";
  s1.setAttribute("crossorigin", "*");
  s0.parentNode.insertBefore(s1, s0);
  return (
    <footer className="footer-section-wrapper bg-white print:hidden">
      <div className="container-x block mx-auto pt-[56px]">
        <div className="w-full flex flex-col items-center mb-[20px]">
          <div className="w-full h-[1px] bg-[#E9E9E9]"></div>
        </div>
        <div className="text-center mb-6 lg:mb-10">
          <h1 className="text-3xl font-bold text-rose-600">Sultana Boutique</h1>
          <div className="w-full h-[1px] bg-[#E9E9E9] mt-4"></div>
        </div>
        <div className="lg:flex justify-between mb-[50px] text-center lg:text-left mx-auto">
          <div className="lg:w-[310px]  ml-0 w-full mb-10 lg:mb-0">
            <h1 className="text-[18] font-500 text-[#2F2F2F] mb-5">About Us</h1>
            <p className="text-[#9A9A9A] text-[15px] w-[247px] leading-[28px] block mx-auto lg:mx-0">
              Welcome to Sultana Boutique, your one-stop destination for
              exquisite
            </p>
          </div>
          <div className="flex-1 lg:flex">
            <div className="lg:w-1/3 lg:flex lg:flex-col items-center w-full mb-10 lg:mb-0 ">
              <div>
                <div className="mb-5">
                  <h6 className="text-[18] font-500 text-[#2F2F2F]">
                    Get Help
                  </h6>
                </div>
                <div>
                  <ul className="flex flex-col space-y-4 text-qgray">
                    <Link className=" sm:text-xs text-sm" to="/faq">
                      FAQ's
                    </Link>
                    <Link className="sm:text-xs text-sm " to="/privacy-policy">
                      Privacy Policy
                    </Link>
                    <Link className="sm:text-xs text-sm " to="/privacy-policy">
                      Terms & Conditions
                    </Link>
                  </ul>
                </div>
              </div>
            </div>
            <div className="lg:w-1/3 lg:flex lg:flex-col items-center w-full mb-10 lg:mb-0 ">
              <div>
                <div className="mb-5">
                  <h6 className="text-[18] font-500 text-[#2F2F2F]">
                    Our Policies
                  </h6>
                </div>
                <div>
                  <ul className="flex flex-col space-y-4 text-qgray">
                    <Link
                      className="sm:text-xs text-sm "
                      to="/all-products/null/null/is_featured"
                    >
                      We Sale Trending Products
                    </Link>
                    <Link className=" sm:text-xs text-sm" to="/size-guide">
                      Size Guide
                    </Link>
                    <Link className=" sm:text-xs text-sm" to="/refundpolicy">
                      Refund Policy
                    </Link>
                  </ul>
                </div>
              </div>
            </div>
            {/* // Social Media Previous Code(Start) =============  */}
            <div className="hidden lg:block lg:w-1/3 w-full mb-10 lg:mb-0">
              <div className="mb-5">
                <h6 className="text-[18] font-500 text-[#2F2F2F]">
                  <p> Follow Us:</p>
                </h6>
              </div>
              <div className="">
                <ul className="flex flex-col space-y-4 items-center lg:items-start justify-center lg:justify-start f">
                  <li>
                    <div className="flex space-x-5 items-center">
                      <Link
                        target="blank"
                        to="https://www.facebook.com/sultanaboutique12"
                      >
                        <img className="w-8" src={fb} alt="" />
                      </Link>
                      <Link
                        target="blank"
                        to=" https://www.youtube.com/@SultanaBoutique"
                      >
                        <img className="w-8" src={yt} alt="" />
                      </Link>
                      <Link
                        target="blank"
                        to="https://www.instagram.com/sultanaboutique6005/"
                      >
                        <img className="w-8" src={instra} alt="" />
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            {/* /* // Social Media Previous Code(END) =============  */}

            <div className="fixed bottom-0 left-0 ml-4 mb-4">
              <ul className="flex flex-col space-y-4 items-center">
                <li>
                  <Link
                    target="_blank"
                    to="https://www.facebook.com/sultanaboutique12"
                  >
                    <img className="w-8" src={fb} alt="" />
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blank"
                    to="https://www.youtube.com/@SultanaBoutique"
                  >
                    <img className="w-8" src={yt} alt="" />
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blank"
                    to="https://www.instagram.com/sultanaboutique6005/"
                  >
                    <img className="w-8" src={instra} alt="" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bottom-bar border-t border-qgray-border lg:h-[82px] lg:flex justify-between items-center">
          <div className="flex lg:space-x-5 justify-between items-center mb-3">
            <span className="sm:text-base text-[10px] text-qgray font-300">
              ©2024
              <Link
                href="https://darkteam.com/"
                target="_blank"
                rel="noreferrer"
                className="font-500 text-rose-400 mx-1"
              >
                Sultana Boutique
              </Link>
              All rights reserved
            </span>
          </div>
          <div className="">
            <a href="#">
              <img
                width="318"
                height="28"
                src={`${process.env.PUBLIC_URL}/assets/images/payment-getways.png`}
                alt="payment-getways"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
