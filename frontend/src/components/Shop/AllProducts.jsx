import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import currency from "currency-formatter";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, getAllProductsShop } from "../../redux/actions/product";
import Loader from "../Layout/Loader";
import styles from "../../styles/styles";
import CreateProduct from "./CreateProduct";

const AllProducts = () => {
  const [open, setOpen] = useState(false);
  const { products, isLoading } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch, seller._id]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    window.location.reload();
  };

  const handleUpdate = (id) => {
    // Find the product to update
    const productToUpdate = products.find((product) => product._id === id);

    // Set the selectedProduct state with the product details
    setSelectedProduct(productToUpdate);

    // Then, you can display a modal or navigate to a page for updating the product
    // You can use libraries like Material-UI Dialog or create your own modal component
  };

  const columns = [
    { field: "id", headerName: "ID SP", minWidth: 150, flex: 0.7 },
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
      field: "discountPrice",
      headerName: "Giá khuyến mãi",
      minWidth: 120,
      flex: 0.6
    },
    {
      field: "Stock",
      headerName: "Số lượng",
      type: "number",
      minWidth: 80,
      flex: 0.6
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
      flex: 0.5,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      }
    },
    {
      field: "Cập nhật", // New column for Update button
      flex: 0.5,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/dashboard-update-product/${params.id}`}>
              {" "}
              {/* Thay đổi đường dẫn */}
              <Button onClick={() => handleUpdate(params.id)}>
                <AiOutlineEdit size={20} />
              </Button>
            </Link>
          </>
        );
      }
    },
    {
      field: "Xóa",
      flex: 0.5,
      minWidth: 100,
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

  products &&
    products.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: `${currency.format(item.originalPrice, {
          code: "VND"
        })}`,
        discountPrice: `${currency.format(item.discountPrice, {
          code: "VND"
        })}`,
        Stock: item.stock,
        sold: item?.sold_out
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
              <span className="text-white">Thêm sản phẩm</span>
            </div>
          </div>
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
          {open && <CreateProduct openForm={open} setOpen={setOpen} />}
        </div>
      )}
    </>
  );
};

export default AllProducts;
