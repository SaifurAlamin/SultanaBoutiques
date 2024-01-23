import { Link } from "react-router-dom";

export default function BannerThree({ topbanner }) {
  return (
    <>
      <div className="w-full">
        <div className="container-x mx-auto">
          <div className="grid rounded xl:grid-cols-1 sm:grid-cols-1 grid-cols-0 gap-2 mb-10">
            {topbanner.map(function (banner) {
              if (banner?.section === "S3") {
                return (
                  <div className="">
                    <div
                      data-aos="fade-right"
                      className="xl:w-full w-full h-[300px]"
                    >
                      <Link to="/">
                        <picture>
                          <source
                            media=""
                            srcSet={`https://sultanaboutiques.com/backend/storage/banner_images/banner_images-16968818073737.jpg`}
                          />

                          <img
                            src={`https://sultanaboutiques.com/backend/storage/banner_images/banner_images-16968818073737.jpg`}
                            alt=""
                            className="w-full rounded max-w-full h-[300px]"
                          />
                        </picture>
                      </Link>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
}
