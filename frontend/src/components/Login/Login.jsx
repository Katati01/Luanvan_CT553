import axios from "axios";
import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { server } from "../../server";
import {
  footerProductLinks,
  footerSupportLinks,
  footercompanyLinks
} from "../../static/data";
import styles from "../../styles/styles";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();  
    try {
      const response = await axios.post(
        `${server}/user/login-user`,
        {
          email,
          password
        },
        { withCredentials: true }
      );
  
      const isAdmin = response.data.user.role === 'admin';   
      toast.success('Login Success!');
      if (isAdmin) {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
      window.location.reload(true);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <Link to="/">
            <h1 className="text-[33px] font-bold">NÔNG NGHIỆP XANH</h1>
          </Link>
          <div className="flex items-center">
            <span className="font-medium mt-1 mr-2 pr-2">
              Đăng nhập vào cửa hàng
            </span>
            <div
              className={`${styles.button} mt-5 relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0`}
            >
              <Link to="/shop-login">
                <h1 className="text-[#fff] flex items-center">
                  Đăng nhập
                  <IoIosArrowForward className="ml-1" />
                </h1>
              </Link>
            </div>
          </div>
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
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  Đăng nhập
                </h2>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
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
              <div className={`${styles.noramlFlex} justify-between`}>
                <div className={`${styles.noramlFlex}`}>
                  <input
                    type="checkbox"
                    name="remember-me"
                    id="remember-me"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Lưu đăng nhập
                  </label>
                </div>
                <div className="text-sm">
                  <Link to="/forgot-password" className="text-blue-600 pl-2">
                    Quên mật khẩu?
                  </Link>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  ĐĂNG NHẬP
                </button>
              </div>
              <div className={`${styles.noramlFlex} w-full`}>
                <h4>Bạn chưa có tài khoản?</h4>
                <Link to="/sign-up" className="text-blue-600 pl-2">
                  Đăng ký tại đây!
                </Link>
              </div>
              <div className={`${styles.noramlFlex} w-full`}>
                <h4>Quay lại trang chủ?</h4>
                <Link to="/" className="text-blue-600 pl-2">
                  Trang chủ
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

export default Login;
