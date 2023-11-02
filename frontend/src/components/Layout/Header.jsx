import React, { useEffect, useRef, useState } from "react";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowForward, IoIosNotificationsOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import Wishlist from "../Wishlist/Wishlist";
import Cart from "../cart/Cart";
import Navbar from "./Navbar";

import { BiMenu } from "react-icons/bi";
import { TbArrowBarLeft } from "react-icons/tb";
import { getAllOrdersOfUser } from "../../redux/actions/order";
import NotificationBar from "../Notification/NotificationBar";
const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const { isSeller } = useSelector((state) => state.seller);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = useState(false);

  const searchInputRef = useRef(null);
  const searchResultsRef = useRef(null);

  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated && user) {
      dispatch(getAllOrdersOfUser(user._id));
    }
  }, [dispatch, isAuthenticated, user]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  const handleDocumentClick = (event) => {
    // Kiểm tra nếu người dùng không click vào searchBox hoặc searchResult, thì ẩn kết quả tìm kiếm
    if (
      !searchInputRef.current?.contains(event.target) &&
      !searchResultsRef.current?.contains(event.target)
    ) {
      setSearchData(null);
    }
  };

  // Sử dụng useEffect để lắng nghe sự kiện "click" trên toàn tài liệu
  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    // Clean up khi component unmount
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <div>
            <Link to="/">
              <h1 className="text-[33px] font-bold underline decoration-[#009b49] hover:decoration-4">
                NÔNG NGHIỆP XANH
              </h1>
            </Link>
          </div>
          {/* search box */}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#009b49] border-[1px] rounded-md"
              ref={searchInputRef}
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {searchTerm && searchData && searchData.length === 0 ? (
              <div
                className="absolute min-h-[6vh] bg-slate-50 shadow-sm-2 z-[2] p-4 w-[100%]"
                ref={searchResultsRef}
              >
                <p className="text-red-500">Không tìm thấy sản phẩm</p>
              </div>
            ) : searchData && searchData.length !== 0 ? (
              <div
                className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4 w-[100%]"
                ref={searchResultsRef}
              >
                {searchData.map((i, index) => (
                  <Link to={`/product/${i._id}`} key={i._id}>
                    <div className="w-full flex items-start py-3">
                      <img
                        src={`${i.images[0]}`}
                        alt=""
                        className="w-[40px] h-[40px] mr-[10px]"
                      />
                      <h1>{i.name}</h1>
                    </div>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
          <div className="flex items-center">
            {/* {isSeller ? null : (
              <span className="font-medium mt-1 mr-2 pr-2">
                Đăng nhập vào cửa hàng
              </span>
            )} */}
            {!isAuthenticated && (
              <div className={`${styles.button}`}>
                <Link to={`${isSeller ? "/dashboard" : "/login"}`}>
                  <h1 className="text-[#fff] flex items-center">
                    {isSeller ? "Quản lý " : "Đăng nhập"}{" "}
                    <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
                {/* {isSeller && isSeller ? null : (
            <Link to="/shop-create">
              <div className={`${styles.button} mt-5`}>
                <span className="text-[#fff] font-[Poppins] text-[18px]">
                  Seller
                </span>
              </div>
            </Link>
            )} */}
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-[#009b49] h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          {/* navitems */}
          <div className={`${styles.noramlFlex}`}>
            <Navbar active={activeHeading} />
          </div>

          <div className="flex">
            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onMouseEnter={handleMouseEnter}
                // onMouseLeave={handleMouseLeave}
              >
                <IoIosNotificationsOutline size={35} color="#fff" />
                <span className="absolute right-0 top-0 rounded-full bg-[#fff] w-4 h-4 top right p-0 m-0 text-[#009b49] font-mono text-[12px] leading-tight text-center">
                  {orders ? orders.length : 0}
                </span>

                {isHovered ? (
                  <div onMouseLeave={handleMouseLeave}>
                    <NotificationBar openNotification={isHovered} />
                  </div>
                ) : null}
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={35} color="#fff" />
                <span className="absolute right-0 top-0 rounded-full bg-[#fff] w-4 h-4 top right p-0 m-0 text-[#009b49] font-mono text-[12px] leading-tight text-center">
                  {wishlist && wishlist.length}
                </span>
              </div>
            </div>

            <div className={`${styles.noramlFlex} `}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart size={35} color="#fff" />
                <span className="absolute right-0 top-0 rounded-full bg-[#fff] w-4 h-4 top right p-0 m-0 text-[#009b49] font-mono text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[20px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={`${user?.avatar}`}
                      className="w-[50px] h-[50px] rounded-full"
                      alt=""
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={35} color="#de650a" />
                  </Link>
                )}
              </div>
            </div>

            {/* cart popup */}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

            {/* wishlist popup */}
            {openWishlist ? (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            ) : null}
          </div>
        </div>
      </div>

      {/* mobile header */}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        }
      w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenu size={40} className="ml-4" onClick={() => setOpen(true)} />
          </div>
          <div>
            <Link to="/">
              <h1 className="text-[33px] font-bold underline decoration-[#009b49] hover:decoration-4">
                NÔNG NGHIỆP XANH
              </h1>
            </Link>
          </div>
          <div>
            <div
              className="relative mr-[20px]"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} />
              <span className="absolute right-0 top-0 rounded-full bg-[#db3f59] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                {cart && cart.length}
              </span>
            </div>
          </div>
          {/* cart popup */}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

          {/* wishlist popup */}
          {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
        </div>

        {/* header sidebar */}
        {open && (
          <div
            className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}
          >
            <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div
                    className="relative mr-[15px]"
                    onClick={() => setOpenWishlist(true) || setOpen(false)}
                  >
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span class="absolute right-0 top-0 rounded-full bg-[#db3f59] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                      {wishlist && wishlist.length}
                    </span>
                  </div>
                </div>
                <TbArrowBarLeft
                  size={30}
                  className="ml-4 mt-5"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="my-8 w-[92%] m-auto h-[40px relative]">
                <input
                  type="search"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="h-[40px] w-full px-2 border-[#009b49] border-[2px] rounded-md"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {searchData && (
                  <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                    {searchData.map((i) => {
                      const d = i.name;

                      const Product_name = d.replace(/\s+/g, "-");
                      return (
                        <Link to={`/product/${Product_name}`}>
                          <div className="flex items-center">
                            <img
                              src={i.image_Url[0].url}
                              alt=""
                              className="w-[50px] mr-2"
                            />
                            <h5>{i.name}</h5>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <Navbar active={activeHeading} />
              <div className={`${styles.button} ml-4 !rounded-[4px]`}>
                <Link to="/shop-create">
                  <h1 className="text-[#fff] flex items-center">
                    Tạo cửa hàng <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>
              <br />
              <br />
              <br />

              <div className="flex w-full justify-center">
                {isAuthenticated ? (
                  <div>
                    <Link to="/profile">
                      <img
                        src={`${user.avatar}`}
                        alt=""
                        className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]"
                      />
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-[18px] pr-[10px] text-[#000000b7]"
                    >
                      Đăng nhập /
                    </Link>
                    <Link
                      to="/sign-up"
                      className="text-[18px] text-[#000000b7]"
                    >
                      Đăng ký
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
