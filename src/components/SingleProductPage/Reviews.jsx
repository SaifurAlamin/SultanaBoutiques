import { useState } from "react";
import LoaderStyleOne from "../Helpers/Loaders/LoaderStyleOne";
import StarRating from "../Helpers/StarRating";

export default function Reviews({
  comments,
  rating,
  ratingHandler,
  name,
  nameHandler,
  email,
  emailHandler,
  phone,
  phoneHandler,
  message,
  messageHandler,
  reviewAction,
  hoverRating,
  hoverHandler,
  reviewLoading,
  handleAddReview,
  allreview,
  logo,
  userid,
  googleUserId,
  averageRating,
}) {
  // const handleHabibBhai = () => {

  //   if (!userid || !googleUserId) {
  //     localStorage.setItem("require", window.location.pathname);
  //     navigate("/login");
  //   }
  // };
  const [showFullTextArray, setShowFullTextArray] = useState(
    allreview.map(() => false)
  );

  const toggleShowMore = (index) => {
    const updatedShowFullTextArray = [...showFullTextArray];
    updatedShowFullTextArray[index] = !updatedShowFullTextArray[index];
    setShowFullTextArray(updatedShowFullTextArray);
  };
  return (
    <div className="review-wrapper w-full">
      <div className="w-full reviews mb-[60px]">
        {/* {allreview?.map((r, i) => (
          <h2>{r?.customer_name}</h2>

        ))} */}

        {/* comments */}
        <div className="w-full comments mb-[60px]">
          {/* {comments &&
            comments.length > 0 && */}
          {allreview?.slice(0, 6).map((r, i) => (
            <div
              key={r.id}
              className="comment-item bg-white px-10 py-[32px] mb-2.5"
            >
              <div className="comment-author flex justify-between items-center mb-3">
                <div className="flex space-x-3 items-center">
                  <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                    <img
                      src={logo}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-[18px] font-medium text-qblack">
                      {r?.customer_name}
                    </p>
                    {/* <p className="text-[13px] font-normal text-qgray">
                      London,UK
                    </p> */}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {Array.from(Array(r?.rating), () => (
                      <span key={r?.rating + Math.random()} className="flex">
                        <StarRating rating={r?.rating} />
                      </span>
                    ))}
                  </div>
                  <span className="text-[13px] font-normal text-qblack mt-1 inline-block">
                    ({r?.rating}.0)
                  </span>
                </div>
              </div>
              <div className="comment mb-[30px]">
                <p className="text-[15px] text-qgray leading-7 text-normal overflow-hidden">
                  {showFullTextArray[i]
                    ? r?.review_text
                    : r?.review_text.slice(0, 300)}
                  {r?.review_text.length > 300 && (
                    <span
                      className=" text-xs font-semibold cursor-pointer text-gray-900"
                      onClick={() => toggleShowMore(i)}
                    >
                      {showFullTextArray[i] ? "show less" : "...show more"}
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* load comments */}
        {/* <div className="w-full flex justify-center">
          <button
            type="button"
            className="bg-qh2-green  text-white rounded w-[300px] h-[50px] text-sm font-semibold"
          >
            Load More
          </button>
        </div> */}
      </div>

      <div className="write-review w-full">
        <h1 className="text-2xl font-medium text-qblack mb-5">
          Write Your Reviews
        </h1>

        <div className="flex space-x-1 items-center mb-[30px]">
          <StarRating
            hoverRating={hoverRating}
            hoverHandler={hoverHandler}
            rating={rating}
            ratingHandler={ratingHandler}
          />
          <span className="text-qblack text-[15px] font-normal mt-1">
            {`${rating}.0`}
          </span>
        </div>

        <div className="w-full review-form ">
          <div className="sm:flex sm:space-x-[30px] items-center mb-5">
            {/* <div className="sm:w-1/3 w-full">
            <InputCom
              label="name*"
              placeholder=""
              type="text"
              name="name"
              inputClasses="h-[50px]"
              value={name}
              inputHandler={nameHandler}
            />
          </div>
          <div className="sm:w-1/3 w-full mt-5 sm:mt-0">
            <InputCom
              label="Email*"
              placeholder=""
              type="email"
              name="name"
              inputClasses="h-[50px]"
              value={email}
              inputHandler={emailHandler}
            />
          </div>
          <div className="sm:w-1/3 w-full mt-5 sm:mt-0">
            <InputCom
              label="Phone Number*"
              placeholder=""
              type="text"
              name="name"
              inputClasses="h-[50px]"
              value={phone}
              inputHandler={phoneHandler}
            />
          </div> */}
          </div>
          <div className="w-full mb-[30px]">
            <h6 className="input-label text-qgray capitalize text-[13px] font-normal block mb-2 ">
              Message*
            </h6>
            <textarea
              value={message}
              onChange={messageHandler}
              name=""
              id=""
              cols="30"
              rows="3"
              className="w-full focus:ring-0 focus:outline-none p-6"
              required
            ></textarea>
          </div>
          {/* <button>Submit</button> */}
          <div className="flex justify-center mb-5">
            <button
              onClick={handleAddReview}
              type="button"
              className="bg-rose-600  text-white rounded w-[300px] h-[50px]  flex justify-center"
            >
              <span className="flex space-x-1 items-center h-full">
                <span className="text-sm  font-semibold">Submit Review</span>

                {reviewLoading && (
                  <span className="w-5 " style={{ transform: "scale(0.3)" }}>
                    <LoaderStyleOne />
                  </span>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
