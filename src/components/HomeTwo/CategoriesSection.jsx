import React from "react";
import { Link } from "react-router-dom";
export default function CategoriesSection({ category }) {
  return (
    <>
      <div className="categories-section-wrapper w-full ">
        <div className="container-x w-full">
          <div className="w-full categories-iems ">
            <div className="justify-around flex  flex-wrap  mb-[46px]">
              {category.map(function (cat) {
                return (
                  <div key={cat.id}>
                    <Link to={`/all-products/${cat.id}`}>
                      <div className="item w-full group cursor-pointer">
                        <div className="w-full flex justify-center">
                          <div className="w-[110px] h-[110px] rounded-full bg-[#EEF1F1] group-hover:bg-rose-400 mb-2.5 flex justify-center items-center">
                            <img
                              className="rounded-full p-2"
                              src={`https://www.sultanaboutiques.com/backend/${cat?.image}`}
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="w-full flex justify-center">
                          <p className="text-base text-qblack whitespace-nowrap ">
                            {cat?.name}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
