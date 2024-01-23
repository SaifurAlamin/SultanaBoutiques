import { Route, Routes } from "react-router-dom";
import About from "./components/About";
import AllProductPage from "./components/AllProductPage";
import ViewMoreProducts from "./components/AllProductPage/ViewMoreProducts.jsx";
import ResetPassword from "./components/Auth/Login/ResetPassword.jsx";
import Login from "./components/Auth/Login/index";
import Profile from "./components/Auth/Profile";
import Signup from "./components/Auth/Signup";
import VerifyEmail from "./components/Auth/Signup/VerifyEmail.js";
import BecomeSaller from "./components/BecomeSaller";
import Blogs from "./components/Blogs";
import Blog from "./components/Blogs/Blog.jsx";
import CardPage from "./components/CartPage";
import CheakoutPage from "./components/CheakoutPage";
import Contact from "./components/Contact";
import Faq from "./components/Faq";
import FlashSale from "./components/FlashSale";
import FourZeroFour from "./components/FourZeroFour";
import HomeTwo from "./components/HomeTwo";
import NotFound from "./components/NotFound/NotFound.js";
import Pay from "./components/Payment/Pay";
import Payinfo from "./components/Payment/Payinfo";
import PaymentForm from "./components/Payment/PaymentForm";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Requireauth from "./components/PrivateRoute/Requireauth";
import ProductsCompaire from "./components/ProductsCompaire/index";
import Returnpolicy from "./components/ReturnPolicy/Returnpolicy";
import SallerPage from "./components/SallerPage";
import Sallers from "./components/Sellers";
import SingleProductPage from "./components/SingleProductPage";
import Relateddetails from "./components/SingleProductPage/Relateddetails";
import Sizeguide from "./components/Sizeguide/Sizeguide";
import Term from "./components/TermConditions/Term.jsx";
import TrackingOrder from "./components/TrackingOrder";
import Wishlist from "./components/Wishlist";

export default function Routers() {
  return (
    <Routes>
      <Route exact path="/" element={<HomeTwo />} />
      {/* <Route exact path="/home-two" element={<Home />} />
      <Route exact path="/home-three" element={<HomeThree />} />
      <Route exact path="/home-four" element={<HomeFour />} />
      <Route exact path="/home-five" element={<HomeFive />} /> */}

      <Route exact path="/single-product" element={<SingleProductPage />}>
        <Route path=":productId" element={<SingleProductPage />} />
      </Route>
      <Route exact path="/cart" element={<CardPage />} />
      <Route
        exact
        path="/checkout"
        element={
          <Requireauth>
            <CheakoutPage />
          </Requireauth>
        }
      />
      <Route exact path="/wishlist" element={<Wishlist />} />
      <Route exact path="/flash-sale" element={<FlashSale />} />
      <Route exact path="/saller-page" element={<SallerPage />} />
      <Route exact path="/products-compaire" element={<ProductsCompaire />} />
      <Route exact path="/sallers" element={<Sallers />} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/blogs" element={<Blogs />} />
      <Route exact path="/blogs/blog" element={<Blog />} />
      <Route exact path="/tracking-order" element={<TrackingOrder />} />
      <Route exact path="/contact" element={<Contact />} />
      <Route exact path="/faq" element={<Faq />} />
      <Route exact path="/terms-conditions" element={<Term />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/single-product" element={<Relateddetails />} />
      <Route exact path="/pay-info/:id" element={<Payinfo />} />
      <Route exact path="/reset-password" element={<ResetPassword />} />
      <Route exact path="/verify-email" element={<VerifyEmail />} />
      <Route exact path="/refundpolicy" element={<Returnpolicy />} />
      <Route exact path="/size-guide" element={<Sizeguide />} />
      <Route exact path="*" element={<NotFound />} />

      <Route
        exact
        path="/profile"
        element={
          <Requireauth>
            <Profile />
          </Requireauth>
        }
      />

      <Route exact path="/become-saller" element={<BecomeSaller />} />
      <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />

      <Route exact path="/payment" element={<PaymentForm />} />
      <Route exact path="/pay" element={<Pay />} />

      <Route exact path="/all-products" element={<AllProductPage />}>
        <Route path=":categoryId" element={<AllProductPage />} />
        <Route path=":categoryId/:subId" element={<AllProductPage />} />
        <Route
          path=":categoryId/:subId/:viewMore"
          element={<AllProductPage />}
        />
      </Route>
      <Route exact path="/all-products" element={<AllProductPage />}>
        <Route path=":viewMore" element={<AllProductPage />} />
      </Route>
      <Route exact path="/more-products" element={<ViewMoreProducts />} />
      {/* <Route path=":paramUrl" element={<ViewMoreProducts />} /> */}
      <Route exact path="*" element={<FourZeroFour />} />
    </Routes>
  );
}
