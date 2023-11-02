import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updateProduct } from "../../redux/actions/product";
import { server } from "../../server";
import { categoriesData } from "../../static/data";

const UpdateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [images, setImages] = useState([]); // Sử dụng useState để quản lý danh sách hình ảnh
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("");
  const { allProducts } = useSelector((state) => state.products);

  useEffect(() => {
    async function fetchProductData() {
      try {
        const response = await axios.get(`${server}/product/get-product/${id}`);
        const product = response.data.product; // Dựa vào JSON đã cung cấp, thay vì response.data, ta cần truy cập response.data.product
        setData(product); // Cập nhật 'data' với dữ liệu sản phẩm đã tải
        setName(product.name);
        setDescription(product.description);
        setCategory(product.category);
        setTags(product.tags);
        setOriginalPrice(product.originalPrice);
        setDiscountPrice(product.discountPrice);
        setStock(product.stock);
        setImages(product.images.map((item) => item)); // Cập nhật danh sách hình ảnh từ JSON
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu sản phẩm:", error);
      }
    }
    fetchProductData();
  }, [id]);

  const handleImageChange = (e) => {
    e.preventDefault();
    const files = Array.from(e.target.files);
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("images", file);
    });

    // Gửi FormData lên máy chủ để tải lên hình ảnh mới
    axios
      .post(`${server}/product/upload-images`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(async (response) => {
        if (response.data.success) {
          // Lấy danh sách URL của các hình ảnh đã tải lên
          const newImageUrls = response.data.imageUrls;

          // Cập nhật danh sách hình ảnh trong state bất đồng bộ
          const updatedImages = [...images];
          await Promise.all(
            newImageUrls.map(async (url) => {
              // Tạo một promise cho việc tải hình ảnh
              return new Promise((resolve) => {
                const image = new Image();
                image.src = url;
                image.onload = () => {
                  updatedImages.push(url);
                  resolve();
                };
              });
            })
          );
          setImages(updatedImages);
        } else {
          toast.error("Có lỗi xảy ra khi tải lên hình ảnh");
        }
      })
      .catch((error) => {
        console.error("Lỗi khi tải lên hình ảnh:", error);
        toast.error("Có lỗi xảy ra khi tải lên hình ảnh");
      });
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages); // Loại bỏ hình ảnh khỏi danh sách hình ảnh
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProductData = {
      name,
      description,
      category,
      tags,
      originalPrice,
      discountPrice,
      stock,
      images,
      shopId: seller._id,
    };

    try {
      const response = await axios.put(
        `${server}/product/update-product/${id}`,
        updatedProductData,
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Sản phẩm đã được cập nhật thành công");
        dispatch(updateProduct(id, updatedProductData));
        navigate("/dashboard-products");
      } else {
        toast.error("Có lỗi xảy ra khi cập nhật sản phẩm");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi cập nhật sản phẩm");
    }
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
            Danh mục <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Choose a category">Chọn danh mục SP</option>
            {categoriesData &&
              categoriesData.map((i) => (
                <option value={i.title} key={i.title}>
                  {i.title}
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
            name="stock"
            value={stock}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setStock(e.target.value)}
            placeholder="Nhập số lượng sản phẩm..."
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
            {images.map((image, index) => (
              <div key={index}>
                <img
                  // src={image.url} // Sử dụng URL hình ảnh từ JSON và định dạng nó theo đúng cấu trúc URL của server
                  src={image}
                  alt=""
                  className="h-[120px] w-[120px] object-cover m-2"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="bg-red-500 text-white rounded-md p-1 m-2"
                >
                  Xóa
                </button>
              </div>
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
