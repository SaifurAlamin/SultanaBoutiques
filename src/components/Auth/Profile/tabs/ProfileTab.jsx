import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function ProfileTab() {
  const [profileImg, setprofileImg] = useState(null);
  const profileImgInput = useRef(null);
  const [userInfo, setUserInfo] = useState({});

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const userProfile = JSON.parse(localStorage.getItem("user"));
  const googleUser = JSON.parse(localStorage.getItem("googleUser"));
  const userdata = userProfile?.user;
  // const googleUserData = googleUser?.user;

  // Fetch User Information
  useEffect(() => {
    fetch(
      `https://www.sultanaboutiques.com/backend/api/SingleUser/${userdata?.id}`
    )
      .then((res) => res.json())
      .then((data) => setUserInfo(data));
  }, []);

  const browseprofileImg = () => {
    profileImgInput.current.click();
  };
  const profileImgChangHandler = (e) => {
    if (e.target.value !== "") {
      const imgReader = new FileReader();
      imgReader.onload = (event) => {
        setprofileImg(event.target.result);
      };
      imgReader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: name
        ? name
        : userInfo?.name
        ? userInfo?.name
        : googleUser?.user?.name,
      address: address
        ? address
        : userdata?.address
        ? userdata?.address
        : googleUser?.user?.address,
      phone: phone
        ? phone
        : userdata?.phone
        ? userdata?.phone
        : googleUser?.user?.phone,
    };
    console.log(data);
    try {
      const response = await axios.put(
        `https://www.sultanaboutiques.com/backend/api/update_user/${
          userInfo?.id ? userInfo?.id : googleUser?.user?.id
        }`,
        data
      );
      console.log(response);
      swal({
        title: response?.data?.message,
        text: "Success",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex space-x-8">
        <div className="w-full ">
          <h3 className="text-center mb-4 text-gray-900">
            Please enter your information
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="input-item flex space-x-2.5 mb-8">
              <div className="w-full h-full">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  label="First Name*"
                  placeholder="Demo Name"
                  type="text"
                  inputClasses="h-[50px]"
                  defaultValue={
                    userInfo?.name ? userInfo?.name : googleUser?.user?.name
                  }
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="input-item flex space-x-2.5 mb-8">
              <div className="w-1/2 h-full">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  readOnly
                  label="Email*"
                  placeholder="demoemial@gmail.com"
                  type="email"
                  inputClasses="h-[50px]"
                  defaultValue={
                    userInfo?.email ? userInfo?.email : googleUser?.user?.email
                  }
                />
              </div>
              <div className="w-1/2 h-full">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  label="Phone Number*"
                  placeholder="Phone Number"
                  type="text"
                  inputClasses="h-[50px]"
                  defaultValue={
                    userInfo?.phone ? userInfo?.phone : googleUser?.user?.phone
                  }
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="input-item mb-8">
              <div className="w-full">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  label="Address*"
                  placeholder="Address"
                  type="text"
                  inputClasses="h-[50px]"
                  defaultValue={userInfo?.address || googleUser?.user?.address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="action-area flex space-x-4 items-center">
              <Link to="/profile#dashboard">
                <button
                  type="button"
                  className="text-sm text-qred font-semibold"
                >
                  Cancel
                </button>
              </Link>
              <button
                type="submit"
                className="w-[100px]  py-3 lg:py-0 lg:w-[164px] h- lg:h-[50px] bg-qh2-green rounded text-white text-xs lg:text-sm"
              >
                Update Profile
              </button>
            </div>
            <div className="item group mt-2 lg:hidden">
              <Link to="/profile#password">
                <div className="flex space-x-1 items-center text-gray-600 hover:text-gray-900">
                  <span className="text-qh2-green" title="Change Password">
                    Change Password
                  </span>
                </div>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
