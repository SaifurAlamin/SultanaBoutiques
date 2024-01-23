import React, { useEffect, useState } from "react";
import LayoutHomeTwo from "../Partials/LayoutHomeTwo";

import datas from "../../data/productsTwo.json";
import { useGetAllCategoryQuery } from "../../features/api/categoryApi";
import NewarrivalesCard from "../Helpers/Cards/NewarrivalesCard";
import ProductCardRowStyleOneTwo from "../Helpers/Cards/ProductCardRowStyleOneTwo";
import ProductCardStyleOneTwo from "../Helpers/Cards/ProductCardStyleOneTwo";
import PupularProductCard from "../Helpers/Cards/PupularProductCard";
import ViewMoreTitle from "../Helpers/ViewMoreTitle";
import Banner from "./Banner";
import BannerFour from "./BannerFour";
import BannerThree from "./BannerThree";
import CampaignCountDown from "./CampaignCountDown";
import CategoriesSection from "./CategoriesSection";

export default function HomeTwo() {
  const [Habib, setHabib] = useState([]);
  // const [category, setCategory] = useState([]);
  const [popular, setPopular] = useState([]);
  const [new_arrival, setNewArrival] = useState([]);
  const [topBanner, setTopBanner] = useState([]);
  const [top_sell, setTopSell] = useState([]);
  const [user_ip, setUserIp] = useState({});
  const [spinner, setSpinner] = useState(true);

  //top Banner
  useEffect(() => {
    // setSpinner(true);
    fetch("https://www.sultanaboutiques.com/backend/api/offer/banner")
      .then((res) => res.json())
      .then((data) => {
        setTopBanner(data);
        // setSpinner(false)  // Hide loading screen
      });
  }, []);

  // useEffect(() => {
  //   setSpinner(true);
  //   fetch("https://www.sultanaboutiques.com/backend/api/product/category")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setCategory(data);
  //       setSpinner(false); // Hide loading screen
  //     });
  // }, []);
  // console.log(category);
  const { data: category, isLoading, isError } = useGetAllCategoryQuery();

  //User IP
  useEffect(() => {
    fetch("https://www.sultanaboutiques.com/backend/api/user-ip")
      .then((res) => res.json())
      .then((data) => localStorage.setItem("user_ip", JSON.stringify(data)));
  }, []);

  //All product
  useEffect(() => {
    fetch("https://www.sultanaboutiques.com/backend/api/home/featured/product")
      .then((res) => res.json())
      .then((data) => setHabib(data));
  }, []);

  //All popular product
  useEffect(() => {
    fetch(
      "https://www.sultanaboutiques.com/backend/api/home/popular/product/get"
    )
      .then((res) => res.json())
      .then((data) => setPopular(data));
  }, []);

  //All New Arrivals
  useEffect(() => {
    fetch(
      "https://www.sultanaboutiques.com/backend/api/home/new-arrival/product"
    )
      .then((res) => res.json())
      .then((data) => setNewArrival(data));
  }, []);

  //Top sell Products
  useEffect(() => {
    fetch("https://www.sultanaboutiques.com/backend/api/home/top-sell/product")
      .then((res) => res.json())
      .then((data) => setTopSell(data));
  }, []);

  const { products } = datas;
  return (
    <LayoutHomeTwo>
      <Banner topbanner={topBanner} className="banner-wrapper " />
      <ViewMoreTitle
        className="my-categories "
        seeMoreUrl="/all-products"
        categoryTitle="Choose Category"
      >
        {isLoading ? (
          <div className="flex justify-center mb-2 ">
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-8 h-8 lg:w-10 lg:h-10 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <CategoriesSection category={category} />
        )}
      </ViewMoreTitle>
      <ProductCardStyleOneTwo sectionTitle="Features Products"></ProductCardStyleOneTwo>
      {/* <SectionStyleThreeHomeTwo
        products={products}
        habib={Habib}
        showProducts={6}
        sectionTitle="Featured Products"
        seeMoreUrl="/all-products"
        className="new-products mb-[60px]"
      /> */}
      <CampaignCountDown topbanner={topBanner} />

      <div className="hidden lg:block">
        <BannerThree
          topbanner={topBanner}
          className="banner-wrapper mb-[46px]"
        />
      </div>
      <PupularProductCard sectionTitle="Popular Sales"></PupularProductCard>
      <div className="lg:hidden">
        <BannerThree
          topbanner={topBanner}
          className="banner-wrapper mb-[46px]"
        />
      </div>
      {/* <SectionStylePopular
        products={products.slice(3, 7)}
        habib={popular}
        showProducts={3}
        sectionTitle="Popular Sales"
        seeMoreUrl="/all-products"
        className="feature-products mb-[60px]"
      /> */}
      {/* <ViewMoreTitle
        className="top-selling-product mb-[60px]"
        seeMoreUrl="/all-products"
        categoryTitle="Top Selling Products"
      >
        <SectionStyleTwo
          habib={top_sell}
          products={products.slice(3, products.length)}
        />
      </ViewMoreTitle> */}
      <ProductCardRowStyleOneTwo sectionTitle="Top Sales"></ProductCardRowStyleOneTwo>

      <BannerFour topbanner={topBanner} className="banner-wrapper mb-[46px]" />
      <NewarrivalesCard sectionTitle="New Arrivals"></NewarrivalesCard>
      {/* <SectionStylenewarrival
        products={products.reverse().slice(0, 10)}
        habib={new_arrival}
        showProducts={3}
        sectionTitle="New Arrivals"
        seeMoreUrl="/all-products"
        className="new-arrivals mb-[60px]"
      /> */}
    </LayoutHomeTwo>
  );
}
