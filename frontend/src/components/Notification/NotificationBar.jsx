import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NotificationBar = ({ openNotification }) => {
  const { orders } = useSelector((state) => state.order);

  return (
    <>
      {openNotification && (
        <div
          className="absolute right-0 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-20"
          style={{ width: "35rem" }}
        >
          <div className="py-2">
            {orders?.map((order) => (
              <Link
                key={order._id}
                to={`/user/order/${order._id}`}
                className="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2"
              >
                {/* <img
                  className="h-8 w-8 rounded-full object-cover mx-1"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                  alt="avatar"
                /> */}
                <p className="text-gray-600 text-sm mx-2">
                  <span>Đơn hàng có ID: </span>
                  <span className="font-bold">{order._id}</span> của bạn hiện
                  đang{" "}
                  <span className="font-bold text-blue-500" href="#">
                    {order.status}
                  </span>{" "}
                </p>
              </Link>
            ))}
          </div>
          <Link
            to={`/profile`}
            className="block bg-gray-800 text-white text-center font-bold py-2"
          >
            Xem thêm
          </Link>
        </div>
      )}
    </>
  );
};

export default NotificationBar;
