import { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { useLocation } from "react-router-dom";
import Accodion from "../Helpers/Accodion";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/LayoutHomeTwo";

export default function Faq() {
  const [faq, setFaq] = useState([]);
  const [spinner, setSpinner] = useState(false);
  //top Banner
  useEffect(() => {
    setSpinner(true);
    fetch("https://www.sultanaboutiques.com/backend/api/faq/list")
      .then((res) => res.json())
      .then((data) => {
        setFaq(data);
        setSpinner(false); // Hide loading screen
      });
  }, []);
  const location = useLocation();
  useEffect(() => {
    // Scroll to the top when the component mounts or when the route changes
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="faq-page-wrapper w-full mb-10">
        <div className="page-title w-full">
          <PageTitle
            title="Frequently Asked Questions"
            breadcrumb={[
              { name: "home", path: "/" },
              { name: "FAQ", path: "/faq" },
            ]}
          />
        </div>
      </div>
      <div className="flex justify-center mb-2 ">
        <ThreeCircles
          height="50"
          width="50"
          color="#004D40"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={spinner}
        />
      </div>
      <div className="contact-wrapper w-full mb-10">
        <div className="container-x mx-auto">
          <div className="main-wrapper w-full lg:flex lg:space-x-[500px]">
            <div className="lg:w-full w-full mb-10 lg:mb-0">
              <h1 className="text-qblack font-bold text-[22px] mb-4">
                Frequently asked questions
              </h1>
              {faq?.map((fq, i) => (
                <div className="flex flex-col space-y-7 justify-between">
                  <Accodion
                    title={fq?.title}
                    des={
                      <p className="text-qblack italic text-[14px]">
                        {fq?.details}
                      </p>
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
