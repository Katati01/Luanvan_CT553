// import { DataGrid } from "@material-ui/data-grid";
// import currency from "currency-formatter";
// import React, { useEffect } from "react";
// import { GiMoneyStack } from "react-icons/gi";
// import { IoFileTrayStackedOutline } from "react-icons/io5";
// import { RiBillLine } from "react-icons/ri";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { getAllOrdersOfShop } from "../../redux/actions/order";
// import { getAllProductsShop } from "../../redux/actions/product";
// import styles from "../../styles/styles";

// const DashboardHero = () => {
//   const dispatch = useDispatch();
//   const { orders } = useSelector((state) => state.order);
//   const { seller } = useSelector((state) => state.seller);
//   const { products } = useSelector((state) => state.products);
//   // const [valStartDay, setValStartDay] = useState("");
//   // const [valEndDay, setValEndDay] = useState("");
//   // const targetRef = useRef();
//   useEffect(() => {
//     dispatch(getAllOrdersOfShop(seller._id));
//     dispatch(getAllProductsShop(seller._id));
//   }, [dispatch]);

//   const calculateShopTotalPrice = (cartItems) => {

//     return cartItems.reduce(
//       (total, item) => total + item.discountPrice * item.qty,
//       0
//     );
//   };

//   const availableBalance = seller?.availableBalance.toFixed(2);

//   const columns = [
//     { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

//     {
//       field: "status",
//       headerName: "Trạng thái",
//       minWidth: 130,
//       flex: 0.7,
//       cellClassName: (params) => {
//         return params.getValue(params.id, "status") === "Delivered"
//           ? "greenColor"
//           : "redColor";
//       },
//     },
//     {
//       field: "itemsQty",
//       headerName: "Số lượng",
//       type: "number",
//       minWidth: 130,
//       flex: 0.7,
//     },

//     {
//       field: "total",
//       headerName: "Tổng cộng",
//       type: "number",
//       minWidth: 130,
//       flex: 0.8,
//       //thêm
//       valueGetter: (params) => {
//         const orderId = params.getValue(params.id, "id");
//         const order = orders.find((item) => item._id === orderId);
//         return `${currency.format(calculateShopTotalPrice(order.cart), {
//           code: "VND",
//         })}`;
//       },
//     },

//     // {
//     //   field: " ",
//     //   flex: 1,
//     //   minWidth: 150,
//     //   headerName: "",
//     //   type: "number",
//     //   sortable: false,
//     //   renderCell: (params) => {
//     //     return (
//     //       <>
//     //         <Link to={`/dashboard/order/${params.id}`}>
//     //           <Button>
//     //             <AiOutlineArrowRight size={20} />
//     //           </Button>
//     //         </Link>
//     //       </>
//     //     );
//     //   },
//     // },
//   ];

//   const row = [];

//   // orders && orders.forEach((item) => {
//   //   row.push({
//   //       id: item._id,
//   //       itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
//   //       total: `${currency.format(item.totalPrice, { code: "VND" })}`,
//   //       status: item.status,
//   //     });
//   // });
//   //thêm
//   orders &&
//     orders.forEach((item) => {
//       row.push({
//         id: item._id,
//         itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
//         status: item.status,
//       });
//     });
//   return (
//     <div className="w-full p-8">
//       <h3 className="text-[22px] font-Poppins pb-2">Tổng quan</h3>
//       <div className="w-full block 800px:flex items-center justify-between">
//         <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
//           <div className="flex items-center">
//             <GiMoneyStack size={30} className="mr-2" fill="#00000085" />
//             <h3
//               className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
//             >
//               Thu nhập (Với 10% phí dich vụ){" "}
//               <span className="text-[16px]"></span>
//             </h3>
//           </div>
//           <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
//             {currency.format(availableBalance, { code: "VND" })}
//           </h5>
//           <Link to="/dashboard-withdraw-money">
//             <h5 className="pt-4 pl-[2] text-[#077f9c]">Yêu cầu rút tiền</h5>
//           </Link>
//         </div>

//         <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
//           <div className="flex items-center">
//             <RiBillLine size={30} className="mr-2" fill="#00000085" />
//             <h3
//               className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
//             >
//               Đơn hàng
//             </h3>
//           </div>
//           <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
//             {orders && orders.length}
//           </h5>
//           <Link to="/dashboard-orders">
//             <h5 className="pt-4 pl-2 text-[#077f9c]">Danh sách đơn hàng</h5>
//           </Link>
//         </div>

//         <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
//           <div className="flex items-center">
//             <IoFileTrayStackedOutline
//               size={30}
//               className="mr-2"
//               fill="#00000085"
//             />
//             <h3
//               className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
//             >
//               Sản phẩm
//             </h3>
//           </div>
//           <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
//             {products && products.length}
//           </h5>
//           <Link to="/dashboard-products">
//             <h5 className="pt-4 pl-2 text-[#077f9c]">Danh sách sản phẩm</h5>
//           </Link>
//         </div>
//       </div>
//       <br />
//       <h3 className="text-[22px] font-Poppins pb-2">Đơn hàng mới nhất</h3>
//       <div className="w-full min-h-[45vh] bg-white rounded">
//         <DataGrid
//           rows={row}
//           columns={columns}
//           pageSize={10}
//           disableSelectionOnClick
//           autoHeight
//         />
//       </div>
//     </div>
//   );
// };

// export default DashboardHero;
import React, { useEffect, useState, useRef } from "react";
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { MdBorderClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { getAllProductsShop } from "../../redux/actions/product";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { Element, Link as ScrollLink } from "react-scroll";

const DashboardHero = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);
  const [valStartDay, setValStartDay] = useState("");
  const [valEndDay, setValEndDay] = useState("");
  const targetRef = useRef();
  console.log("orders", orders);
  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch]);

  const availableBalance =
    seller?.availableBalance.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    }) + "";

  const scrollToTarget = () => {
    targetRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleStartDayChange = (e) => {
    setValStartDay(e.target.value);
  };
  const handleEndDayChange = (e) => {
    setValEndDay(e.target.value);
  };
  const getAllProducts = orders?.filter((item) => {
    const orderDate = new Date(item.createdAt.slice(0, 10));
    return (
      orderDate >= new Date(valStartDay) &&
      orderDate <= new Date(valEndDay) &&
      item.status === "Delivered"
    );
  });

  const sumOder = getAllProducts?.reduce((total, item) => {
    return total + item.totalPrice;
  }, 0);
  const totalRevenue = sumOder - sumOder * 0.1;
  console.log("sumOder", sumOder);
  const columns = [
    { field: "id", headerName: "Mã đơn hàng", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Tình trạng",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Số lượng",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Tổng tiền",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/dashboard/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div className="w-full p-8">
      <h3 className="text-[22px] font-Poppins pb-2">Tổng quan</h3>
      <div className="w-full block 800px:flex items-center justify-between">
        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect
              size={30}
              className="mr-2"
              fill="#00000085"
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}>
              Số dư <span className="text-[16px]">( - 10% phí dịch vụ)</span>
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {availableBalance}
          </h5>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <Link to="/dashboard-withdraw-money">
              <h5 className="pt-4 pl-[2] text-[#077f9c]">Rút tiền</h5>
            </Link>
            <ScrollLink
              style={{
                cursor: "pointer",
                lineHeight: "none",
                color: "#077fb6",
                paddingTop: "16px",
              }}
              to="target"
              smooth={true}
              duration={100}>
              Thống kê
            </ScrollLink>
          </div>
        </div>

        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <MdBorderClear size={30} className="mr-2" fill="#00000085" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}>
              Đơn hàng
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {orders && orders.length}
          </h5>
          <Link to="/dashboard-orders">
            <h5 className="pt-4 pl-2 text-[#077f9c]">Xem đơn hàng</h5>
          </Link>
        </div>

        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect
              size={30}
              className="mr-2"
              fill="#00000085"
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}>
              Sản phẩm
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {products && products.length}
          </h5>
          <Link to="/dashboard-products">
            <h5 className="pt-4 pl-2 text-[#077f9c]">Xem sản phẩm</h5>
          </Link>
        </div>
      </div>
      <br />
      <div className="w-full min-h-[45vh] bg-white rounded">
        {/* Thống kê */}
        <Element
          name="target"
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px",
            background: "#ccc",
          }}>
          <h1 style={{ fontSize: "20px", fontWeight: "700" }}>
            Thống kê doanh thu----
          </h1>
          <div>
            <label>Ngày bắt đầu: </label>
            <input
              style={{ border: "1px solid black" }}
              value={valStartDay}
              type="date"
              onChange={handleStartDayChange}></input>
            <label style={{ marginLeft: "50px" }}>Ngày kết thúc: </label>
            <input
              style={{ border: "1px solid black" }}
              className="border border-solid border-red-500"
              type="date"
              value={valEndDay}
              onChange={handleEndDayChange}></input>
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "700",
              padding: "50px",
              float: "right",
              display: "inline-block",
            }}>
            <span>Tổng doanh thu: </span>
            <span style={{ color: "#294fff" }}>
              {totalRevenue?.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              }) + ""}
            </span>
          </div>
        </Element>
      </div>
    </div>
  );
};

export default DashboardHero;
