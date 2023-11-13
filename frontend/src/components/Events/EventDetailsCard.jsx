import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addTocart } from "../../redux/actions/cart";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { server } from "../../server";
import styles from "../../styles/styles";

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
  console.log(eventData);

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

  const formatDate = (date) => {
    const inputDate = typeof date === "string" ? new Date(date) : date;

    if (
      Object.prototype.toString.call(inputDate) !== "[object Date]" ||
      isNaN(inputDate.getTime())
    ) {
      return "Invalid Date";
    }

    const day = inputDate.getUTCDate();
    const month = inputDate.getUTCMonth() + 1;
    const year = inputDate.getUTCFullYear();

    const formattedDate = `${day < 10 ? "0" : ""}${day}-${
      month < 10 ? "0" : ""
    }${month}-${year}`;

    return formattedDate;
  };

  const startDate = eventData ? formatDate(eventData.start_Date) : "";
  const finishDate = eventData ? formatDate(eventData.Finish_Date) : "";

  return (
    <div className="flex items-center bg-white">
      {eventData ? (
        <div className={`${styles.section} 800px:w-[80%] mx-auto`}>
          <div className="w-full flex items-center flex-col">
            <h1
              className={`${styles.productTitle} text-[30px] text-center my-4 mt-8 uppercase`}
            >
              {eventData.name}
            </h1>

            <div className="w-full flex items-center flex-col gap-2 p-4 px-8">
              <div className="font-semibold text-[#1b4462]">
                Sự kiện được tạo bởi:
                <span className="text-[#c96665]">
                  {" " + eventData.shop.name}
                </span>
              </div>

              <div className="font-semibold">
                Thời gian diễn ra sự kiện: Từ{" "}
                <span className="text-[#c96665]">{" " + startDate}</span> đến{" "}
                <span className="text-[#c96665]">{" " + finishDate}</span>
              </div>
            </div>

            <div className="mx-auto flex items-center">
              <div class="p-8 pt-0">
                {/* <p className="text-[18px] text-[#1b4462] text-justify leading-8">
                  {eventData.description}
                </p> */}
                <p
                  className="text-[18px] text-[#1b4462] text-justify leading-8"
                  dangerouslySetInnerHTML={{ __html: eventData.description }}
                ></p>

                <img
                  src={`${eventData && eventData.images[select]}`}
                  alt="Event"
                  className="rounded-[8px] my-6 mx-auto w-[80%] h-[80%]"
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default EventDetailsCard;

/* <div className="w-full flex flex-wrap">
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
                </div> */

/* <div className="w-full 800px:w-[50%] pt-5">
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
              </div> */
