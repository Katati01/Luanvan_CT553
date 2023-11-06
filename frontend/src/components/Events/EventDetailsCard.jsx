import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { useParams } from "react-router-dom";
import axios from "axios";
import currency from "currency-formatter";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addTocart } from "../../../redux/actions/cart";
import { addToWishlist, removeFromWishlist } from "../../../redux/actions/wishlist";
import styles from "../../../styles/styles";

const EventDetailsCard = ({ setOpen }) => {
    const { id } = useParams();
    const { cart } = useSelector((state) => state.cart);
    const { wishlist } = useSelector((state) => state.wishlist);
    const dispatch = useDispatch();
    const [eventData, setEventData] = useState(null);
    const [count, setCount] = useState(1);
    const [click, setClick] = useState(false);

    useEffect(() => {
        async function fetchEventData() {
            try {
                const response = await axios.get(`${serve}/event/get-event/${id}`);
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

    const removeFromWishlistHandler = (eventData) => {
        setClick(!click);
        dispatch(removeFromWishlist(eventData));
    };

    const addToWishlistHandler = (eventData) => {
        setClick(!click);
        dispatch(addToWishlist(eventData));
    };

    const decrementCount = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    const incrementCount = () => {
        setCount(count + 1);
    };

    const addToCartHandler = (id) => {
        const isItemExists = cart && cart.find((i) => i._id === id);
        if (isItemExists) {
            toast.error("Sự kiện đã có trong giỏ hàng!");
        } else {
            if (eventData.stock < count) {
                toast.error("Sự kiện số lượng có giới hạn!");
            } else {
                const cartData = { ...eventData, qty: count };
                dispatch(addTocart(cartData));
                toast.success("Sự kiện đã thêm vào giỏ hàng!");
            }
        }
    };

    return (
        <div className="bg-[#fff]">
            {eventData ? (
                <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
                    <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
                        <div className="block w-full 800px:flex">
                            <div className="w-full 800px:w-[50%]">
                                <img src={eventData.images[0]} alt={eventData.name} />
                            </div>
                            <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
                                <h1 className={`${styles.productTitle} text-[22px] px-5`}>
                                    {eventData.name}
                                </h1>
                                <div className="flex pt-3 px-5">
                                    {eventData.discountPrice ? (
                                        <>
                                            <h4 className={`${styles.productDiscountPrice} text-2xl`}>
                                                {currency.format(eventData.discountPrice, { code: "VND" })}
                                            </h4>
                                            <del className={`${styles.price} ml-2`}>
                                                {currency.format(eventData.originalPrice, { code: "VND" })}
                                            </del>
                                        </>
                                    ) : (
                                        <h4 className={`${styles.productDiscountPrice} text-2xl`}>
                                            {currency.format(eventData.originalPrice, { code: "VND" })}
                                        </h4>
                                    )}
                                </div>
                                <p className="py-2 text-[18px] leading-8 pb-10 px-5 whitespace-pre-line">
                                    {eventData.description.length > 200 ? (
                                        <>
                                            {eventData.description.slice(0, 130)} ...
                                            <Link to={`/event/${eventData._id}`}>
                                                <p className="text-[#0054c3f5]">Nhấn để xem thêm</p>
                                            </Link>
                                        </>
                                    ) : (
                                        eventData.description
                                    )}
                                </p>
                                <div className="flex items-center mt-12 justify-between px-5 pr-3">
                                    <div>
                                        <button
                                            className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                                            onClick={decrementCount}
                                        >
                                            -
                                        </button>
                                        <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                                            {count}
                                        </span>
                                        <button
                                            className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
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
                                                title="Add to wishlist"
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="px-4">
                                    <div
                                        className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
                                        onClick={() => addToCartHandler(eventData._id)}
                                    >
                                        <span className="text-[#fff] flex items-center">
                                            Thêm vào giỏ <AiOutlineShoppingCart className="ml-1" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default EventDetailsCard;