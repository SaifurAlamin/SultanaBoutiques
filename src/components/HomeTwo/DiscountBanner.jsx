import { useState } from "react";
import { toast } from "react-toastify";

export default function DiscountBanner({ className }) {
  const [subscription, setSubscription] = useState({});
  const msg = subscription?.message;

  //Sign Up with User Name Pass and others Info
  const handleSubmit = async (e) => {
    event.preventDefault();
    const email = event.target.email.value;
    const addItem = { email };

    const url = "https://www.sultanaboutiques.com/backend/api/post-subscribe";
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(addItem),
    })
      .then((Response) => Response.json())
      .then((data) => setSubscription(data));
  };
  // useEffect(() => {
  //   if (userData?.status === 200) {
  //     navigate(from, { replace: true });
  //   }
  // });
  if (msg === "Thank you! You are aleady enlisted as our newsletter!") {
    toast(msg);
  } else if (msg === "Subscription Email sent successfully") {
    swal({
      title: "Thank you! You are aleady enlisted as our newsletter!",
      icon: "success",
    });
  }

  return (
    <div
      className={`discount-banner w-full h-[307px] bg-cover flex justify-center items-center ${
        className || ""
      }`}
      style={{
        background: `url(${process.env.PUBLIC_URL}/assets/images/discount-banner-2.jpg) no-repeat`,
        backgroundSize: "cover",
      }}
    >
      <div>
        <div data-aos="fade-up">
          <h1 className="sm:text-3xl text-lg  font-semibold text-qblack mb-1 text-center">
            <span className="mx-1 text-pink-300">Subscribe our Newsletter</span>
          </h1>
          {/* <p className="text-center sm:text-[18px] text-sm font-400">
            Subscribe our Newsletter
          </p> */}
        </div>
        <form role="form" onSubmit={handleSubmit}>
          <div
            data-aos="fade-right"
            className="w-[280px] lg:w-[400px] h-[54px] flex mt-4"
          >
            <div className="flex-1 bg-white pl-4 flex space-x-2 items-center focus-within:text-qyellow text-qblack border-r-2">
              <span className="text-rose-500 font-bold">
                <svg
                  width="17"
                  height="15"
                  viewBox="0 0 17 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 14H2C1.4 14 1 13.6 1 13V2C1 1.4 1.4 1 2 1H15C15.6 1 16 1.4 16 2V13C16 13.6 15.6 14 15 14Z"
                    stroke="currentColor"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 4L8.5 8.5L14 4"
                    stroke="currentColor"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <input
                type="email"
                name="email"
                className="w-full h-full  border-none focus:border-none text-sm placeholder:text-xs placeholder:text-qblack text-qblack font-400 tracking-wider"
                placeholder="EMAIL ADDRESS"
              />
            </div>
            <button
              type="submit"
              className="w-[72px] lg:w-[80px]  h-full bg-rose-600 text-xs font-semibold text-white p-2 lg:p-0 lg:text-sm  rounded-r"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
