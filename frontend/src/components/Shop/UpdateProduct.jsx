// import React, { useEffect, useState } from "react";
// import { AiOutlinePlusCircle } from "react-icons/ai";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// // import { updateProduct } from "../../redux/actions/product";
// import { createProduct } from "../../redux/actions/product";
// import { categoriesData } from "../../static/data";
// import { toast } from "react-toastify";

// const UpdateProduct = () => {
//   const { seller } = useSelector((state) => state.seller);
//   const { success, error } = useSelector((state) => state.products);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [data, setData] = useState(null);
//   const [images, setImages] = useState([]);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [tags, setTags] = useState("");
//   const [originalPrice, setOriginalPrice] = useState();
//   const [discountPrice, setDiscountPrice] = useState();
//   const [stock, setStock] = useState();
//   const { id } = useParams();
//   const { allProducts } = useSelector((state) => state.products);
//   useEffect(() => {
//     const data = allProducts && allProducts.find((i) => i._id === id);
//     setData(data);
//     setName(data?.name);
//     setDescription(data?.description);
//     setCategory(data?.category);
//     setTags(data?.tags);
//     setOriginalPrice(data?.originalPrice);
//     setDiscountPrice(data?.discountPrice);
//     setStock(data?.stock);
//     setImages(data?.images?.map((item) => item.url));
//   }, [allProducts]);

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//     }
//     if (success) {
//       toast.success("Product updated successfully!");
//       navigate("/dashboard-products"); 
//     }
//   }, [dispatch, error, navigate, success]);

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);

//     setImages([]);

//     files.forEach((file) => {
//       const reader = new FileReader();

//       reader.onload = () => {
//         if (reader.readyState === 2) {
//           setImages((old) => [...old, reader.result]);
//         }
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const newForm = new FormData();

//     images.forEach((image) => {
//       newForm.set("images", image);
//     });
//     newForm.append("name", name);
//     newForm.append("description", description);
//     newForm.append("category", category);
//     newForm.append("tags", tags);
//     newForm.append("originalPrice", originalPrice);
//     newForm.append("discountPrice", discountPrice);
//     newForm.append("stock", stock);
//     newForm.append("shopId", seller._id);
//     dispatch(
//       createProduct({
//         name,
//         description,
//         category,
//         tags,
//         originalPrice,
//         discountPrice,
//         stock,
//         shopId: seller._id,
//         images,
//       })
//     );
//   };

//   return (
//     <div className="w-[90%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
//       <h5 className="text-[30px] font-Poppins text-center">Cập nhật thông tin sản phẩm</h5>
//       {/* create product form */}
//       <form onSubmit={handleSubmit}>
//         <br />
//         <div>
//           <label className="pb-2">
//           Tên sản phẩm <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             name="name"
//             value={name}
//             className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Nhật tên sản phẩm..."
//           />
//         </div>
//         <br />
//         <div>
//           <label className="pb-2">
//             Mô tả <span className="text-red-500">*</span>
//           </label>
//           <textarea
//             cols="30"
//             required
//             rows="8"
//             type="text"
//             name="description"
//             value={description}
//             className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Thêm mô tả sản phẩm..."
//           ></textarea>
//         </div>
//         <br />
//         <div>
//           <label className="pb-2">
//             Thể loại <span className="text-red-500">*</span>
//           </label>
//           <select
//             className="w-full mt-2 border h-[35px] rounded-[5px]"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <option value="Choose a category">Chọn danh mục SP</option>
//             {categoriesData &&
//               categoriesData.map((i) => (
//                 <option value={i.title} key={i.title}>
//                   {i.title}
//                 </option>
//               ))}
//           </select>
//         </div>
//         <br />
//         <div>
//           <label className="pb-2">Tags</label>
//           <input
//             type="text"
//             name="tags"
//             value={tags}
//             className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             onChange={(e) => setTags(e.target.value)}
//             placeholder="Thêm tag cho sản phẩm..."
//           />
//         </div>
//         <br />
//         <div>
//           <label className="pb-2">Giá gốc</label>
//           <input
//             type="number"
//             name="price"
//             value={originalPrice}
//             className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             onChange={(e) => setOriginalPrice(e.target.value)}
//             placeholder="Thêm giá gốc của sản phẩm (Giá chưa áp dụng khuyến mãi)!"
//           />
//         </div>
//         <br />
//         <div>
//           <label className="pb-2">
//             Giá khuyến mãi <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="number"
//             name="price"
//             value={discountPrice}
//             className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             onChange={(e) => setDiscountPrice(e.target.value)}
//             placeholder="Giá sản phẩm sau khi áp dụng khuyến mãi..."
//           />
//         </div>
//         <br />
//         <div>
//           <label className="pb-2">
//             Số lượng sản phẩm <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="number"
//             name="price"
//             value={stock}
//             className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             onChange={(e) => setStock(e.target.value)}
//             placeholder="Thêm số lượng sản phẩm..."
//           />
//         </div>
//         <br />
//         <div>
//           <label className="pb-2">
//             Hình ảnh <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="file"
//             name=""
//             id="upload"
//             className="hidden"
//             multiple
//             onChange={handleImageChange}
//           />
//           <div className="w-full flex items-center flex-wrap">
//             <label htmlFor="upload">
//               <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
//             </label>
//             {/* {images &&
//               images.map((i) => (
//                 <img
//                   src={i}
//                   key={i}
//                   alt=""
//                   className="h-[120px] w-[120px] object-cover m-2"
//                 />
//               ))} */}

//             {images &&
//               images.map((i, index) => (
//                 <img
//                   src={i}
//                   key={index}
//                   alt=""
//                   className="h-[120px] w-[120px] object-cover m-2"
//                 />
//             ))}

//           </div>
//           <br />
//           <div>
//             <input
//               type="submit"
//               value="Cập nhật"
//               className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             />
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdateProduct;

import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateProduct } from "../../redux/actions/product";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";

const UpdateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();
  const { id } = useParams();
  const { allProducts } = useSelector((state) => state.products);

  useEffect(() => {
    const productData = allProducts.find((item) => item._id === id);
    setData(productData);
    setName(productData.name);
    setDescription(productData.description);
    setCategory(productData.category);
    setTags(productData.tags);
    setOriginalPrice(productData.originalPrice);
    setDiscountPrice(productData.discountPrice);
    setStock(productData.stock);
    setImages(productData.images.map((item) => item.url));
  }, [allProducts, id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Cập nhật sản phẩm thành công!");
      navigate("/dashboard-products");
    }
  }, [dispatch, error, navigate, success]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((prevImages) => [...prevImages, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProduct = {
      name,
      description,
      category,
      tags,
      originalPrice,
      discountPrice,
      stock,
      shopId: seller._id,
      images,
    };

    dispatch(updateProduct(id, updatedProduct));
  };

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">
        Cập nhật thông tin sản phẩm
      </h5>
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2">
            Tên sản phẩm <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên sản phẩm..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Mô tả <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            required
            rows="8"
            type="text"
            name="description"
            value={description}
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Thêm mô tả sản phẩm..."
          ></textarea>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Thể loại <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Choose a category">Chọn danh mục SP</option>
            {categoriesData &&
              categoriesData.map((item) => (
                <option value={item.title} key={item.title}>
                  {item.title}
                </option>
              ))}
          </select>
        </div>
        <br />
        <div>
          <label className="pb-2">Tags</label>
          <input
            type="text"
            name="tags"
            value={tags}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setTags(e.target.value)}
            placeholder="Thêm tag cho sản phẩm..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">Giá gốc</label>
          <input
            type="number"
            name="price"
            value={originalPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Thêm giá gốc của sản phẩm (Giá chưa áp dụng khuyến mãi)!"
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Giá khuyến mãi <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={discountPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDiscountPrice(e.target.value)}
            placeholder="Giá sản phẩm sau khi áp dụng khuyến mãi..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Số lượng sản phẩm <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={stock}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setStock(e.target.value)}
            placeholder="Thêm số lượng sản phẩm..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Hình ảnh <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name=""
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {images &&
              images.map((image, index) => (
                <img
                  src={image}
                  key={index}
                  alt=""
                  className="h-[120px] w-[120px] object-cover m-2"
                />
              ))}
          </div>
        </div>
        <br />
        <div>
          <input
            type="submit"
            value="Cập nhật"
            className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
