// import { Button } from "@material-ui/core";
// import { DataGrid } from "@material-ui/data-grid";
// import React, { useEffect } from "react";
// import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { getAllProductsShop } from "../../redux/actions/product";
// import { deleteProduct } from "../../redux/actions/product";
// import Loader from "../Layout/Loader";
// import currency from "currency-formatter";

// const AllProducts = () => {
//   const { products, isLoading } = useSelector((state) => state.products);
//   const { seller } = useSelector((state) => state.seller);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getAllProductsShop(seller._id));
//   }, [dispatch]);

//   const handleDelete = (id) => {
//     dispatch(deleteProduct(id));
//     window.location.reload();
//   };

//   const columns = [
//     { field: "id", headerName: "ID SP", minWidth: 150, flex: 0.7 },
//     {
//       field: "name",
//       headerName: "Tên X sản phẩm",
//       minWidth: 180,
//       flex: 1.4,
//     },
//     {
//       field: "price",
//       headerName: "Giá",
//       minWidth: 100,
//       flex: 0.6,
//     },
//     {
//       field: "Stock",
//       headerName: "Số lượng",
//       type: "number",
//       minWidth: 80,
//       flex: 0.5,
//     },

//     {
//       field: "sold",
//       headerName: "Đã bán",
//       type: "number",
//       minWidth: 130,
//       flex: 0.6,
//     },
//     {
//       field: "Xem",
//       flex: 0.8,
//       minWidth: 100,
//       headerName: "",
//       type: "number",
//       sortable: false,
//       renderCell: (params) => {
//         return (
//           <>
//             <Link to={`/product/${params.id}`}>
//               <Button>
//                 <AiOutlineEye size={20} />
//               </Button>
//             </Link>
//           </>
//         );
//       },
//     },
//     {
//       field: "Xóa",
//       flex: 0.8,
//       minWidth: 120,
//       headerName: "",
//       type: "number",
//       sortable: false,
//       renderCell: (params) => {
//         return (
//           <>
//             <Button onClick={() => handleDelete(params.id)}>
//               <AiOutlineDelete size={20} />
//             </Button>
//           </>
//         );
//       },
//     },
//   ];

//   const row = [];

//   products &&
//     products.forEach((item) => {
//       row.push({
//         id: item._id,
//         name: item.name,
//         price:`${currency.format(item.discountPrice, {
//           code: "VND",
//         })}`,
//         Stock: item.stock,
//         sold: item?.sold_out,
//       });
//     });

//   return (
//     <>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <div className="w-full mx-8 pt-1 mt-10 bg-white">
//           <DataGrid
//             rows={row}
//             columns={columns}
//             pageSize={10}
//             disableSelectionOnClick
//             autoHeight
//           />
//         </div>
//       )}
//     </>
//   );
// };

// export default AllProducts;
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
// import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { AiOutlineDelete, AiOutlineEye, AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { deleteProduct } from "../../redux/actions/product";
import { updateProduct } from "../../redux/actions/product";
import Loader from "../Layout/Loader";
import currency from "currency-formatter";

const AllProducts = () => {
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
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Giá",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Số lượng",
      type: "number",
      minWidth: 80,
      flex: 0.6,
    },
    {
      field: "sold",
      headerName: "Đã bán",
      type: "number",
      minWidth: 130,
      flex: 0.6,
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
      },
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
             <Link to={`/dashboard-update-product/${params.id}`}> {/* Thay đổi đường dẫn */}
              <Button onClick={() => handleUpdate(params.id)}>
                <AiOutlineEdit size={20} />
              </Button>
            </Link>
          </>
        );
      },
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
      },
    },
  ];

  const row = [];

  products &&
    products.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: `${currency.format(item.discountPrice, {
          code: "VND",
        })}`,
        Stock: item.stock,
        sold: item?.sold_out,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
};


export default AllProducts;
