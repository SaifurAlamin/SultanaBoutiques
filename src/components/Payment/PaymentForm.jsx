import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentForm = () => {
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handlePayment = async () => {
    setLoading(true);
    const data = { amount };

    try {
      const response = await axios.post(
        `https://www.sultanaboutiques.com/backend/api/process-payment`,
        data
      );

      if (response.status === 200) {
        // Payment successful, handle success on the frontend
        alert("success");
        navigate("/faq");
      } else {
        // Handle payment failure on the frontend
        const responseData = await response.json();
        console.error(responseData);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center mt-20">
      <div className="product-row-card-style-one-two rounded w-[600px]  h-[450px] bg-[#004D40] group relative overflow-hidden">
        <p className="title mb-2.5 text-[20px] mt-5 font-600 text-center text-white leading-[24px] line-clamp-2 hover:text-blue-600">
          MD MAYIN UDDIN
        </p>
        <p className="title mb-2.5 text-[20px] mt-5 font-600 text-center text-white leading-[24px] line-clamp-2 hover:text-blue-600">
          Shirt
        </p>
        <div className="flex justify-center ">
          <div>
            <div className="price">
              <span className="offer-price text-center text-white font-600 text-[18px] mr-1 inline-block">
                $100
              </span>
            </div>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            {/* <button className='bg-[#333] text-white' onClick={handlePayment} disabled={loading}>
                            {loading ? 'Processing...' : 'Pay Now'}
                        </button> */}
            <div className="text-center mt-2">
              <button
                onClick={handlePayment}
                disabled={loading}
                type="submit"
                className="w-[254px] justify-content-center h-[40px] bg-[#B00020] text-white text-sm rounded"
              >
                {loading ? "Processing..." : "Pay Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
