import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="pt-20 pb-0">
        <div className="terms-condition-page w-full bg-white ">
          <p className="text-center text-qred font-extrabold text-2xl">
            Opps!! Page Not found
          </p>
          <Link to="https://sultanaboutiques.com/">
            <p className="text-center underline text-blue-600 font-extrabold text-xl">
              Go to Home
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
