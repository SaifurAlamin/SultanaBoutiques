import React from "react";

const CustomLeftArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 left-6 max-w-4 cursor-pointer hover:w-10 hover:h-10 rounded-full hover:bg-black hover:bg-opacity-80 "
    >
      <i class="fa-solid fa-chevron-left text-2xl font-bold text-rose-600"></i>
    </button>
  );
};

export default CustomLeftArrow;
