export default function CampaignCountDown({ topbanner }) {
  // console.log(topbanner);

  return (
    <>
      <div className="w-full">
        <div className="container-x mx-auto">
          <div className="grid rounded xl:grid-cols-1 sm:grid-cols-1 grid-cols-0 gap-2 mb-10">
            {topbanner.map(function (banner) {
              if (banner?.section === "S2") {
                return (
                  <div className="">
                    <div
                      data-aos="fade-right"
                      className="xl:w-full w-full h-[350px]"
                    >
                      <a href="#">
                        <picture>
                          <source
                            media=""
                            srcSet={`https://sultanaboutiques.com/backend/${banner?.banner_image}`}
                          />
                          <img
                            src={`https://sultanaboutiques.com/backend/${banner?.banner_image}`}
                            alt=""
                            className="w-full rounded max-w-full h-[350px]"
                          />
                        </picture>
                      </a>
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
