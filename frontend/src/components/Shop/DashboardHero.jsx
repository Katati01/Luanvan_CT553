import { DataGrid } from "@material-ui/data-grid";
import currency from "currency-formatter";
import React, { useEffect } from "react";
import { GiMoneyStack } from "react-icons/gi";
import { IoFileTrayStackedOutline } from "react-icons/io5";
import { RiBillLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { getAllProductsShop } from "../../redux/actions/product";
import styles from "../../styles/styles";


const DashboardHero = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch]);

  const calculateShopTotalPrice = (cartItems) => {
<<<<<<< HEAD
    return cartItems.reduce((total, item) => total + item.discountPrice * item.qty, 0);
  };
  
=======
    return cartItems.reduce(
      (total, item) => total + item.discountPrice * item.qty,
      0
    );
  };

>>>>>>> origin/backend
  const availableBalance = seller?.availableBalance.toFixed(2);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Trạng thái",
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
      headerName: "Tổng cộng",
      type: "number",
      minWidth: 130,
      flex: 0.8,
      //thêm
      valueGetter: (params) => {
        const orderId = params.getValue(params.id, "id");
        const order = orders.find((item) => item._id === orderId);
        return `${currency.format(calculateShopTotalPrice(order.cart), {
          code: "VND",
        })}`;
      },
    },

    // {
    //   field: " ",
    //   flex: 1,
    //   minWidth: 150,
    //   headerName: "",
    //   type: "number",
    //   sortable: false,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <Link to={`/dashboard/order/${params.id}`}>
    //           <Button>
    //             <AiOutlineArrowRight size={20} />
    //           </Button>
    //         </Link>
    //       </>
    //     );
    //   },
    // },
  ];

  const row = [];

  // orders && orders.forEach((item) => {
  //   row.push({
  //       id: item._id,
  //       itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
  //       total: `${currency.format(item.totalPrice, { code: "VND" })}`,
  //       status: item.status,
  //     });
  // });
  //thêm
  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
        status: item.status,
      });
    });
  return (
    <div className="w-full p-8">
      <h3 className="text-[22px] font-Poppins pb-2">Tổng quan</h3>
      <div className="w-full block 800px:flex items-center justify-between">
        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <GiMoneyStack size={30} className="mr-2" fill="#00000085" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              Thu nhập (Với 10% phí dich vụ){" "}
              <span className="text-[16px]"></span>
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {currency.format(availableBalance, { code: "VND" })}
          </h5>
          <Link to="/dashboard-withdraw-money">
            <h5 className="pt-4 pl-[2] text-[#077f9c]">Yêu cầu rút tiền</h5>
          </Link>
        </div>

        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <RiBillLine size={30} className="mr-2" fill="#00000085" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              Đơn hàng
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {orders && orders.length}
          </h5>
          <Link to="/dashboard-orders">
            <h5 className="pt-4 pl-2 text-[#077f9c]">Danh sách đơn hàng</h5>
          </Link>
        </div>

        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <IoFileTrayStackedOutline
              size={30}
              className="mr-2"
              fill="#00000085"
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              Sản phẩm
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {products && products.length}
          </h5>
          <Link to="/dashboard-products">
            <h5 className="pt-4 pl-2 text-[#077f9c]">Danh sách sản phẩm</h5>
          </Link>
        </div>
      </div>
      <br />
      <h3 className="text-[22px] font-Poppins pb-2">Đơn hàng mới nhất</h3>
      <div className="w-full min-h-[45vh] bg-white rounded">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </div>
  );
};

export default DashboardHero;
