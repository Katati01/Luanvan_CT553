import axios from "axios";
import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { server } from "../../server";
import {
  footerProductLinks,
  footerSupportLinks,
  footercompanyLinks,
} from "../../static/data";
import styles from "../../styles/styles";

const ShopCreate = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState();
  const [avatar, setAvatar] = useState();
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const newForm = new FormData();

    newForm.append("file", avatar);
    newForm.append("name", name);
    newForm.append("email", email);
    newForm.append("password", password);
    // newForm.append("zipCode", zipCode);
    newForm.append("address", address);
    newForm.append("phoneNumber", phoneNumber);
    axios
      .post(`${server}/shop/create-shop`, newForm, config)
      .then((res) => {
        toast.success(res.data.message);
        setName("");
        setEmail("");
        setPassword("");
        setAvatar();
        // setZipCode();
        setAddress("");
        setPhoneNumber();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <Link to="/">
            <h1 className="text-[33px] font-bold underline decoration-[#009b49] hover:decoration-4">
              NÔNG NGHIỆP XANH
            </h1>
          </Link>
        </div>
      </div>
      <div
        className="bg-[url(https://images.unsplash.com/photo-1681919313941-080179983d9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80)] 
        min-h-screen g-6 flex h-full flex-wrap items-center justify-center lg:justify-between"
      >
        <div class="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            class="w-full"
            alt="Sample image"
          />
        </div>
        <div className="mt-8 mb-6 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  Đăng ký cửa hàng
                </h2>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tên cửa hàng
                </label>
                <div className="mt-1">
                  <input
                    type="name"
                    name="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Số điện thoại
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="phone-number"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Địa chỉ Email
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Địa chỉ cửa hàng
                </label>
                <div className="mt-1">
                  <input
                    type="address"
                    name="address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Zip Code
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="zipcode"
                  required
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div> */}

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mật khẩu
                </label>
                <div className="mt-1 relative">
                  <input
                    type={visible ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {visible ? (
                    <AiOutlineEye
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(true)}
                    />
                  )}
                </div>
              </div>

              {/* <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700"
              ></label>
              <div className="mt-2 flex items-center">
                <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                  {avatar ? (
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <RxAvatar className="h-8 w-8" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <span>Tải lên ảnh đại diện</span>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    onChange={handleFileInputChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div> */}

              <div>
                <button
                  type="submit"
                  className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  ĐĂNG KÝ
                </button>
              </div>
              <div className={`${styles.noramlFlex} w-full`}>
                <h4>Bạn đã trở thành người bán?</h4>
                <Link to="/shop-login" className="text-blue-600 pl-2">
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* footer */}

      <div className="bg-[#009b49] text-white">
        <div className="grid grid-cols-1 sm:gird-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 sm:text-center">
          <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center">
            <img
              src="https://upload-os-bbs.hoyolab.com/upload/2021/12/14/150538198/70445fce849442234a0c524cbd3b99c5_7958474898017939592.png?x-oss-process=image/resize,s_1000/quality,q_80/auto-orient,0/interlace,1/format,png"
              alt=""
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <br />
            <p></p>
          </ul>

          <ul className="text-center sm:text-start">
            <h1 className="mb-1 font-semibold text-[20px]">Công ty</h1>
            {footerProductLinks.map((link, index) => (
              <li key={index}>
                <Link
                  className="text-white hover:text-teal-400 duration-300
                    text-sm cursor-pointer leading-6"
                  to={link.link}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="text-center sm:text-start">
            <h1 className="mb-1 font-semibold text-[20px]">Cửa hàng</h1>
            {footercompanyLinks.map((link, index) => (
              <li key={index}>
                <Link
                  className="text-white hover:text-teal-400 duration-300
                    text-sm cursor-pointer leading-6"
                  to={link.link}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="text-center sm:text-start">
            <h1 className="mb-1 font-semibold text-[20px]">Hỗ trợ</h1>
            {footerSupportLinks.map((link, index) => (
              <li key={index}>
                <Link
                  className="text-white hover:text-teal-400 duration-300
                    text-sm cursor-pointer leading-6"
                  to={link.link}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShopCreate;
