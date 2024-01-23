import { Carousel } from "flowbite-react";
import CustomLeftArrow from "../Helpers/Cards/CustomLeftArrow";
import CustomRightArrow from "../Helpers/Cards/CustomRightArrow";
export default function Banner({ topbanner }) {
  return (
    <>
      <div className="w-full">
        <div className="container-x mx-auto card mb-5">
          <div className="h-44 sm:h-64 xl:h-80 2xl:h-96">
            <Carousel
              customLeftArrow={<CustomLeftArrow />}
              customRightArrow={<CustomRightArrow />}
              renderButtonGroupOutside
            >
              <img
                src="https://sultanaboutiques.com/backend/storage/banner_images/banner_images-16968818073737.jpg"
                alt="..."
              />
              <img
                src="https://sultanaboutiques.com/backend/storage/banner_images/banner_images-16968818073737.jpg"
                alt="..."
              />
              <img
                src="https://sultanaboutiques.com/backend/storage/banner_images/banner_images-16968818073737.jpg"
                alt="..."
              />
            </Carousel>
          </div>
          {/* <div className="grid  rounded xl:grid-cols-2 sm:grid-cols-1 grid-cols-0 gap-2 mb-10">
            {topbanner.map(function (banner) {
              if (banner?.section === 'S1') {
                return (
                  <div className="">
                    <div data-aos="fade-right" className="xl:w-full  w-full h-[300px]">
                      <a href="#">
                        <picture>
                          <source
                            media=""
                            srcSet={`https://sultanaboutiques.com/backend/${banner?.banner_image}`}
                          />
                          <img
                            src={`https://sultanaboutiques.com/backend/${banner?.banner_image}`}
                            alt=""
                            className="w-full rounded max-w-full h-[300px]"
                          />
                        </picture>
                      </a>
                    </div>
                  </div>
                );
              }
            })}
          </div> */}
        </div>
      </div>
    </>
  );
}
