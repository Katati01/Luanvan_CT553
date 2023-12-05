import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";

const EventCard = ({ active, data }) => {
  return (
    <div className={`w-8/12 mx-auto mt-6 block ${active ? "unset" : "mb-12"}`}>
      <div className="mx-auto">
        <img
          src={`${data.images[0]}`}
          alt=""
          className="w-full h-[450px] object-cover rounded-lg"
        />
      </div>
      <div className="w-full mt-6 lg:[w-50%] flex flex-col justify-center">
        <div className={`${styles.productTitle}`}>{data.name}</div>
        <div className="flex items-center p-1 border-b border-gray-300">
          <Link to={`/shop/preview/${data?.shop._id}`}>
            <img
              src={`${data?.shop?.avatar}`}
              alt=""
              className="w-[20px] h-[20px] rounded-full mr-2"
            />
          </Link>
          <div className="pr-4 pl-2">
            <Link to={`/shop/preview/${data?.shop._id}`}>
              <h3
                className={`${styles.shop_name} pb-1 pt-1 !text-black font-[600]`}
              >
                {data.shop.name}
              </h3>
            </Link>
          </div>
        </div>
        {/* <p>{data.description}</p> */}
        {data.description.length > 200 ? (
          <p
            className="mt-4 font-[300] text-[13px]"
            dangerouslySetInnerHTML={{
              __html: data.description.slice(0, 400) + "..."
            }}
          ></p>
        ) : (
          <p dangerouslySetInnerHTML={{ __html: data.description }}></p>
        )}

        <br />
        <div className="flex items-center">
          <Link to={`/event/${data._id}`}>
            <div className={`${styles.button} text-[#fff]`}>Xem chi tiết</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
