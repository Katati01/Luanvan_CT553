import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteEvent, getAllEventsShop } from "../../redux/actions/event";
import { getAllProductsShop } from "../../redux/actions/product";
import { deleteProduct } from "../../redux/actions/product";
import Loader from "../Layout/Loader";
import currency from "currency-formatter";
import styles from "../../styles/styles";
import CreateEvent from "./CreateEvent";
const AllEvents = () => {
  const [open, setOpen] = useState(false);
  const { events, isLoading } = useSelector((state) => state.events);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEventsShop(seller._id));
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteEvent(id));
    window.location.reload();
  };

  const columns = [
    { field: "id", headerName: "ID X SP", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Tên sản phẩm",
      minWidth: 180,
      flex: 1.4
    },
    {
      field: "price",
      headerName: "Giá",
      minWidth: 100,
      flex: 0.6
    },
    {
      field: "Stock",
      headerName: "Số lượng",
      type: "number",
      minWidth: 80,
      flex: 0.5
    },

    {
      field: "sold",
      headerName: "Đã bán",
      type: "number",
      minWidth: 130,
      flex: 0.6
    },
    {
      field: "Xem",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        // const d = params.row.name;
        // const product_name = d.replace(/\s+/g, "-");
        // const event_name = d.replace(/\s+/g, "-");
        return (
          <>
            {/* <Link to={`/product/${product_name}`}> */}
            <Link to={`/event/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      }
    },
    {
      field: "Xóa",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      }
    }
  ];

  const row = [];

  events &&
    events.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: `${currency.format(item.discountPrice, {
          code: "VND"
        })}`,
        Stock: item.stock,
        sold: item.sold_out
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <div className="w-full flex justify-end">
            <div
              onClick={() => setOpen(true)}
              className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3 bg-[#f61d1deb]`}
            >
              <span className="text-white">Tạo sự kiện, khuyến mãi</span>
            </div>
          </div>
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
          {/* create event form */}
          {open && <CreateEvent openForm={open} setOpen={setOpen} />}
        </div>
      )}
    </>
  );
};

export default AllEvents;
