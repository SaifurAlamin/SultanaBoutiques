import React from "react";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";

export default function ViewMoreProducts() {
  return (
    <>
      <Layout childrenClasses="pt-0 pb-0">
        <div className="about-page-wrapper w-full">
          <div className="title-area w-full">
            <PageTitle
              title="About Us"
              breadcrumb={[
                { name: "home", path: "/" },
                { name: "About us", path: "/about" },
              ]}
            />
          </div>
          <p>Hello</p>
        </div>
      </Layout>
    </>
  );
}
