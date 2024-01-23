import { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/LayoutHomeTwo";

export default function Returnpolicy() {
  const [returnDetails, setReturnDetails] = useState({});
  const refundDetails = returnDetails?.refund_policy;
  const [spinner, setSpinner] = useState(false);
  //top Banner
  useEffect(() => {
    setSpinner(true);
    fetch("https://www.sultanaboutiques.com/backend/api/product/company/info")
      .then((res) => res.json())
      .then((data) => {
        setReturnDetails(data);
        setSpinner(false); // Hide loading screen
      });
  }, []);

  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="terms-condition-page w-full bg-white pb-[30px]">
        <div className="w-full mb-[30px]">
          <PageTitle
            breadcrumb={[
              { name: "home", path: "/" },
              { name: "Refund Policy", path: "refundpolicy" },
            ]}
            title="Refund Policy"
          />
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
        <div className="w-full">
          <div className="container-x mx-auto p-90">
            <div className="content-item w-full mb-10">
              <div
                className="text-justify mx-6 lg:mx-0"
                dangerouslySetInnerHTML={{ __html: refundDetails }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
