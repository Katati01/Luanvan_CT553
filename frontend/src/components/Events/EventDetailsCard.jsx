import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { useParams } from "react-router-dom";
import axios from "axios";
import currency from "currency-formatter";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addTocart } from "../../redux/actions/cart";
import { addToWishlist, removeFromWishlist } from "../../redux/actions/wishlist";
import styles from "../../styles/styles";
import { server } from "../../server";
import { Link, useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";

const EventDetailsCard = ({ setOpen }) => {
  const { id } = useParams();
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const [eventData, setEventData] = useState(null);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    async function fetchEventData() {
      try {
        const response = await axios.get(`${server}/event/get-event/${id}`);
        const event = response.data.event;
        setEventData(event);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    }

    fetchEventData();
  }, [id]);

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist, id]);
  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category}`);
  };



  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const removeFromWishlistHandler = (eventData) => {
    setClick(!click);
    dispatch(removeFromWishlist(eventData));
  };

  const addToWishlistHandler = (eventData) => {
    setClick(!click);
    dispatch(addToWishlist(eventData));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Sản phẩm đã có trong giỏ hàng!");
    } else {
      if (eventData.stock < count) {
        toast.error("Sản phẩm có số lượng giới hạn!");
      } else {
        const carteventData = { ...eventData, qty: count };
        dispatch(addTocart(carteventData));
        toast.success("Sản phẩm đã thêm vào giỏ hàng!");
      }
    }
  };



  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = eventData._id + user._id;
      const userId = user._id;
      const sellerId = eventData.shop._id;
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.eventData.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.eventData.message);
        });
    } else {
      toast.error("Vui lòng đăng nhập để nhắn tin");
    }
  };
  return (
    <div className="flex items-center bg-white">
      {eventData ? (
        <div className={`${styles.section} 800px:w-[80%] mx-auto`}>
          <div className="w-full flex items-center">
            <div className="w-full items-center">
              <h1 className={`${styles.productTitle} text-center `}>{eventData.name}</h1>
              <div className="mx-auto flex items-center">

                <img
                  src={`${eventData && eventData.images[select]}`}
                  alt=""
                  className="flex items-center rounded-[8px] mb-3 w-full"
                />
                
              </div>
              {/* <div className="w-full flex flex-wrap">
                  {eventData &&
                    eventData.images.map((i, index) => (
                      <div
                        className={`${select === 0 ? "border" : "null"
                          } cursor-pointer`}
                      >
                        <img
                          src={`${i}`}
                          alt=""
                          className="h-[115px] overflow-hidden object-cover rounded-[8px]"
                          onClick={() => setSelect(index)}
                        />
                      </div>
                    ))}
                  <div
                    className={`${select === 1 ? "border" : "null"
                      } cursor-pointer`}
                  ></div>
                </div> */}

              {/* <div className="w-full 800px:w-[50%] pt-5">
                <h1 className={`${styles.productTitle}`}>{eventData.name}</h1>
                <div className="flex">
                  <p>
                    Tag: #<i className="text-[#242e8a] mr-4 ">{eventData.tags}</i>
                  </p>
                  <p>
                    Danh mục: <i className="text-[#8a2424] ">{eventData.category}</i>
                  </p>

                  <p>
                    Danh mục:{" "}
                    <i
                      className="text-[#8a2424] cursor-pointer"
                      onClick={() => handleCategoryClick(eventData.category)}
                    >
                      {eventData.category}
                    </i>
                  </p>
                </div>

                <span className="font-[500] text-[17px] text-[#f1055c]">
                  {eventData?.sold_out} đã bán
                </span>
                <div className="flex pt-3">
                  <h4
                    className={`${styles.productDiscountPrice} mt-5 !text-3xl font-bol `}
                  >
                    {eventData.discountPrice === 0
                      ? `${currency.format(eventData.originalPrice, {
                        code: "VND",
                      })}`
                      : `${currency.format(eventData.discountPrice, {
                        code: "VND",
                      })}`}
                  </h4>
                  {eventData.discountPrice !== 0 && (
                    <h3 className={`${styles.price}`}>
                      {`${currency.format(eventData.originalPrice, {
                        code: "VND",
                      })}`}
                    </h3>
                  )}

                  <div className="ml-5">
                    <p
                      className={`${eventData.stock > 0 ? "text-[#008000]" : "text-[#FF0000]"
                        }`}
                    >
                      {eventData.stock > 0 ? "Còn hàng" : "Hết hàng"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-1 px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-6 py-[11px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-1 px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => removeFromWishlistHandler(eventData)}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => addToWishlistHandler(eventData)}
                        color={click ? "red" : "#333"}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );

};


export default EventDetailsCard;