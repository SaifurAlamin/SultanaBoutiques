import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import data from "../../data/products.json";
import BreadcrumbCom from "../BreadcrumbCom";
import Layout from "../Partials/LayoutHomeTwo";
import logo from "../assets/logo/user.png";
import ProductView from "./ProductView";
import RelatedProduct from "./RelatedProduct";
import Reviews from "./Reviews";
import SallerInfo from "./SallerInfo";

export default function SingleProductPage() {
  const { productId } = useParams();
  const location = useLocation();

  const [tab, setTab] = useState("des");
  const [rating, setRating] = useState(1);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [reviewLoading, setLoading] = useState(false);
  const reviewElement = useRef(null);
  const [allreview, setAllReview] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const [report, setReport] = useState(false);
  const [isReviewed, setIsReviewed] = useState(false);
  const [commnets, setComments] = useState([
    {
      id: Math.random(),
      author: "Rafiqul Islam",
      comments: `Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the redi 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book. It
                has survived not only five centuries but also the on leap into
                electronic typesetting, remaining`,
      review: 4,
      replys: [
        {
          id: Math.random(),
          name: "Willium Kingson",
          comments: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
        },
      ],
    },
    {
      id: Math.random(),
      author: "Abdullah Mamun",
      comments: `Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the redi 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book. It
                has survived not only five centuries but also the on leap into
                electronic typesetting, remaining`,
      review: 5,
    },
  ]);
  const navigate = useNavigate();
  const rtng = rating;
  const reviewid = localStorage.getItem("reviewId");

  const user = JSON.parse(localStorage.getItem("user"));
  const userInfo = user?.user;
  const uId = userInfo?.id;

  const googleUser = JSON.parse(localStorage.getItem("googleUser"));

  // SingleProduct for use description
  const singleProducts = location?.state?.find((p) => p.id == productId);

  const getLocalStorageItem = JSON.parse(
    localStorage.getItem("singlePageProducts")
  );

  const singleProduct = singleProducts ? singleProducts : getLocalStorageItem;

  // Fetch all review
  useEffect(() => {
    fetch(
      `https://www.sultanaboutiques.com/backend/api/getsinglereview/${singleProduct?.id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setAllReview(data);
        // Hide loading screen
      });
  }, [isReviewed, singleProduct?.id]);

  // const avgRating = allreview?.reduce(
  //   (sum, rating) => sum + +rating?.rating / allreview.length,
  //   0
  // );

  // const averageRating = Math.round(avgRating);
  // useEffect(() => {
  //   setRating(averageRating);
  // }, [averageRating]);

  // Add review

  const handleAddReview = async () => {
    const customer_id = uId ? uId : googleUser?.user?.id;
    const product_id = singleProduct?.id;
    const rating = rtng;
    const review_text = message;

    localStorage.removeItem("reviewId");

    const data = {
      customer_id,
      product_id,
      rating,
      review_text,
    };

    if (!customer_id) {
      localStorage.setItem("require", window.location.pathname);
      navigate("/login");
    } else {
      try {
        const response = await axios.post(
          `https://www.sultanaboutiques.com/backend/api/addReview`,
          data
        );
        if (response) {
          const res = response.data?.message;
          toast(`${res}`);
          setMessage("");

          setIsReviewed(!isReviewed);
        } else {
          toast("Sorry!!!! You have not select message");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const videos = singleProduct?.productVideos;
  console.log(videos);

  const reviewAction = () => {
    setLoading(true);
    setTimeout(() => {
      if ((name, message, rating)) {
        setComments((prev) => [
          {
            id: Math.random(),
            author: name,
            comments: message,
            review: rating,
          },
          ...prev,
        ]);
        setLoading(false);
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setRating(1);
        setHover(0);
        window.scrollTo({
          top: -reviewElement.current.getBoundingClientRect().top,
          left: 0,
          behavior: "smooth",
        });
      }
      setLoading(false);
      return false;
    }, 2000);
  };

  return (
    <>
      <Layout childrenClasses="pt-0 pb-0">
        <div className="single-product-wrapper w-full ">
          <div className="product-view-main-wrapper bg-white pt-[30px] w-full">
            <div className="breadcrumb-wrapper w-full ">
              <div className="container-x mx-auto">
                <BreadcrumbCom
                  paths={[
                    { name: "home", path: "/" },
                    { name: "single product", path: "/single-product" },
                  ]}
                />
              </div>
            </div>
            <div className="w-full bg-white pb-[60px]">
              <div className="container-x mx-auto">
                <ProductView reportHandler={() => setReport(!report)} />
              </div>
            </div>
          </div>

          <div
            className="product-des-wrapper w-full relative pb-[60px]"
            ref={reviewElement}
          >
            <div className="tab-buttons w-full mb-10 mt-5 sm:mt-0">
              <div className="container-x mx-auto">
                <ul className="flex space-x-12 ">
                  <li>
                    <span
                      onClick={() => setTab("des")}
                      className={`py-[15px] sm:text-[15px] text-sm sm:block border-b font-medium cursor-pointer ${
                        tab === "des"
                          ? "border-qyellow text-qblack "
                          : "border-transparent text-qgray"
                      }`}
                    >
                      Description
                    </span>
                  </li>
                  <li>
                    <span
                      onClick={() => setTab("review")}
                      className={`py-[15px] sm:text-[15px] text-sm sm:block border-b font-medium cursor-pointer ${
                        tab === "review"
                          ? "border-qyellow text-qblack "
                          : "border-transparent text-qgray"
                      }`}
                    >
                      {`Reviews(${allreview?.length})`}
                    </span>
                  </li>
                  {!videos || videos?.length == "0" ? (
                    ""
                  ) : (
                    <li>
                      <span
                        onClick={() => setTab("gallery")}
                        className={`py-[15px] sm:text-[15px] text-sm sm:block border-b font-medium cursor-pointer ${
                          tab === "gallery"
                            ? "border-qyellow text-qblack "
                            : "border-transparent text-qgray"
                        }`}
                      >
                        {`Videos(${videos?.length})`}
                        {/* {`Videos(${
                          !videos || videos?.length === "0"
                            ? "0"
                            : videos?.length
                        })`} */}
                      </span>
                    </li>
                  )}

                  {/* <li>
                    <span
                      onClick={() => setTab("info")}
                      className={`py-[15px] sm:text-[15px] text-sm sm:block border-b font-medium cursor-pointer ${tab === "info"
                        ? "border-qyellow text-qblack "
                        : "border-transparent text-qgray"
                        }`}
                    >
                      Seller Info
                    </span>
                  </li> */}
                </ul>
              </div>
              <div className="w-full h-[1px] bg-[#E8E8E8] absolute left-0 sm:top-[50px] top-[36px] -z-10"></div>
            </div>

            <div
              className={`tab-contents w-full ${
                tab === "review"
                  ? "min-h-[200px] lg:min-h-[300px]"
                  : "min-h-[50px] lg:min-h-[80px]"
              }`}
            >
              <div className="container-x mx-auto">
                {tab === "review" && (
                  <div data-aos="fade-up" className="w-full tab-content-item">
                    <h6 className="text-[18px] font-medium text-qblack mb-2">
                      Reviews
                    </h6>
                    {/* review-comments */}
                    <div className="w-full">
                      <Reviews
                        reviewLoading={reviewLoading}
                        reviewAction={reviewAction}
                        comments={commnets.slice(0, 2)}
                        name={name}
                        nameHandler={(e) => setName(e.target.value)}
                        email={email}
                        emailHandler={(e) => setEmail(e.target.value)}
                        phone={phone}
                        phoneHandler={(e) => setPhone(e.target.value)}
                        message={message}
                        messageHandler={(e) => setMessage(e.target.value)}
                        rating={rating}
                        ratingHandler={setRating}
                        hoverRating={hover}
                        hoverHandler={setHover}
                        handleAddReview={handleAddReview}
                        allreview={allreview}
                        logo={logo}
                        userid={uId}
                        googleUserId={googleUser?.user?.id}
                        // averageRating={averageRating}
                      />
                      <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                        type="warning"
                      />
                    </div>
                  </div>
                )}
                {tab === "des" && (
                  <div data-aos="fade-up" className="w-full tab-content-item">
                    <p className="text-[15px] text-qgray text-normal mb-2">
                      {singleProduct?.description}
                    </p>
                    {/* <div>
                      <h6 className="text-[18px] text-medium mb-4">
                        Features :
                      </h6>
                      <ul className="list-disc ml-[15px]">
                        <li className="font-normal text-qgray leading-9">
                          slim body with metal cover
                        </li>
                        <li className="font-normal text-qgray leading-9">
                          latest Intel Core i5-1135G7 processor (4 cores / 8
                          threads)
                        </li>
                        <li className="font-normal text-qgray leading-9">
                          8GB DDR4 RAM and fast 512GB PCIe SSD
                        </li>
                        <li className="font-normal text-qgray leading-9">
                          NVIDIA GeForce MX350 2GB GDDR5 graphics card backlit
                          keyboard, touchpad with gesture support
                        </li>
                      </ul>
                    </div> */}
                  </div>
                )}

                {/* Gallery part ================= */}
                {/* {productsImg &&
                  productsImg.length > 0 &&
                  productsImg.map((img) => (
                    <div
                      onClick={() => changeImgHandler(img)}
                      key={img.id}
                      className="w-[110px] h-[110px] p-[15px] border border-qgray-border cursor-pointer"
                    >
                      <img
                        // src={`${process.env.PUBLIC_URL}/assets/images/${img.src}`}
                        src={`https://sultanaboutiques.com/backend/${img}`}
                        alt=""
                        className={`w-full h-full object-contain ${
                          src !== img ? "opacity-50" : ""
                        } `}
                      />
                    </div>
                  ))} */}

                {tab === "gallery" && (
                  <div className="grid lg:grid-cols-3 grid-cols-1 mx-auto gap-10 lg:gap-4 rounded">
                    {videos?.map((item, index) => (
                      <div
                        onClick={() => setOpenModal(true)}
                        key={index}
                        className="card shadow lg:w-full "
                      >
                        <video controls className="lg:h-[220px] cursor-pointer">
                          <source
                            src={`https://sultanaboutiques.com/backend/${item}`}
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    ))}
                  </div>
                )}

                {tab === "info" && (
                  <div data-aos="fade-up" className="w-full tab-content-item">
                    <SallerInfo products={data.products.slice(0, 8)} />
                  </div>
                )}
              </div>
            </div>
          </div>
          <RelatedProduct />

          {/* <div className="related-product w-full bg-white">
            <div className="container-x mx-auto">
              <div className="w-full py-[60px]">
                <h1 className="sm:text-3xl text-xl font-600 text-qblacktext leading-none mb-[30px]">
                  Related Product
                </h1>
                <div
                  data-aos="fade-up"
                  className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5"
                >
                  <DataIteration
                    datas={data.products}
                    startLength={5}
                    endLength={9}
                  >
                    {({ datas }) => (
                      <div key={datas.id} className="item">
                        <ProductCardStyleOne datas={datas} />
                      </div>
                    )}
                  </DataIteration>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </Layout>
    </>
  );
}
