import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

const Hero = () => {
  const { isSeller } = useSelector((state) => state.seller);
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)",
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#fff] font-[600] capitalize`}
        >
          NÔNG NGHIỆP XANH
          <br />
        </h1>
        <p className="pt-5 text-[18px] font-[Poppins] font-[500] text-[#fff]">
          Chào mừng bạn đến với chúng tôi! Ở đây, chúng tôi mang đến một trải
          nghiệm độc đáo liên quan đến nông nghiệp hiện đại, kết hợp công nghệ
          và tình yêu đối với việc trồng trọt, chăm sóc cây trồng và nuôi dưỡng
          động vật. Hãy khám phá cùng chúng tôi!
        </p>
        <div className="flex justify-evenly">
          <Link to="/products">
            {/* <div className={`${styles.button} mt-5 `}>
              <span className="text-[#fff] font-[Poppins] text-[18px]">
                Mua ngay
              </span>
            </div> */}

            <div
              className={`${styles.button} mt-5 relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0`}
            >
              <span className="text-[#fff] font-[Poppins] text-[18px]">
                Mua ngay
              </span>
            </div>
          </Link>
          {/* <Link to="/shop-create" >
            <div className={`${styles.button} mt-5`}>
                 <span className="text-[#fff] font-[Poppins] text-[18px]">
                    Seller
                 </span>
            </div>
        </Link> */}
          {/* <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`}>
              <h1 className="text-[#fff] flex items-center">
                {isSeller ? "Go Dashboard" : "Become Seller"}{" "}
                <IoIosArrowForward className="ml-1" />
              </h1>
            </Link> */}
          {isSeller && isSeller ? null : (
            <Link to="/shop-create">
              <div
                className={`${styles.button} mt-5 relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0`}
              >
                <span className="text-[#fff] font-[Poppins] text-[18px]">
                  Seller
                </span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
