import BreadcrumbCom from "../BreadcrumbCom";
import EmptyCardError from "../EmptyCardError";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/LayoutHomeTwo";
import ProductsTable from "./ProductsTable";

export default function CardPage({ cart = true }) {
  return (
    <Layout childrenClasses={cart ? "pt-0 pb-0" : ""}>
      {cart === false ? (
        <div className="cart-page-wrapper w-full">
          <div className="container-x mx-auto">
            <BreadcrumbCom
              paths={[
                { name: "home", path: "/" },
                { name: "cart", path: "/cart" },
              ]}
            />
            <EmptyCardError />
          </div>
        </div>
      ) : (
        <div className="cart-page-wrapper w-full bg-white">
          <div className="w-full ">
            <PageTitle
              title="Your Cart"
              breadcrumb={[
                { name: "home", path: "/" },
                { name: "cart", path: "/cart" },
              ]}
            />
          </div>
          <div className="w-full">
            <div className="container-x mx-auto">
              <ProductsTable className="mb-[30px]" />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
