import React from "react";
import { Link } from "react-router-dom";
import {
  footercompanyLinks,
  footerProductLinks,
  footerSupportLinks
} from "../../static/data";

const Footer = () => {
  return (
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
                to={`/${link.link}`}
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

      {/* <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
         text-center pt-2 text-gray-400 text-sm pb-8"
      >
        <span>© 2023 Becodemy. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
        <div className="sm:block flex items-center justify-center w-full">
          <img
            src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
            alt=""
          />
        </div>
      </div> */}
    </div>
  );
};

export default Footer;
