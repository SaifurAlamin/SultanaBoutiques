import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(
  // "pk_test_51OD2q3AA6UFVA2NTBtmWc2MImuQCE05YiYCGy09FbTvntHUx8RNMTshIN7HrqpePHa1yrJAWZ6aIKQUdTXhaWj8v00ObscJHad"
  "pk_live_51OP4aRENbcLlrlapK9CIXG7ktssc3sYHdIxdrIHvLO2Haxd0Hi1oVQr1q2XEtmd5SFbkU0OAZoc61e58xnUmjRCx00MFVjdvIb"
); // Replace with your actual publishable key

function Pay() {
  const location = useLocation();

  const order_details = JSON.parse(localStorage.getItem("orderProduct"));
  const productName = order_details?.productName;
  const amount = order_details?.amt;

  const order_id = localStorage.getItem("order_id");

  function Checkout() {
    const [url, setUrl] = useState("");

    useEffect(() => {
      const handleCheckout = async () => {
        try {
          const response = await fetch(
            "https://www.sultanaboutiques.com/backend/api/session",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                productname: productName,
                total: amount,
                order_id: order_id,
              }),
            }
          );

          const data = await response.json();

          // Extract the Session URL from the response
          const sessionUrl = data.session_url;

          const session_id = data.session_id;
          localStorage.setItem("stripe_session_id", JSON.stringify(session_id));
          setUrl(sessionUrl);
        } catch (error) {
          console.error("Fetch Error:", error);
        }
      };

      handleCheckout();
    }, []);

    useEffect(() => {
      if (url) {
        window.location.href = url; // Redirect to the Stripe Checkout link
      }
    }, [url]);

    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch data from Laravel API
    fetch("https://www.sultanaboutiques.com/backend/api/success")
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <h1>Stripe Payment Loading</h1>
      <p>{message}</p>
      <Elements stripe={stripePromise}>
        <Checkout />
      </Elements>
    </div>
  );
}

export default Pay;
