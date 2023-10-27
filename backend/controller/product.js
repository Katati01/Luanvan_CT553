const express = require("express");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Product = require("../model/product");
const Order = require("../model/order");
const Shop = require("../model/shop");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");
const mongoose = require("mongoose");

// create product
router.post(
  "/create-product",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("Id cửa hàng không hợp lệ!", 400));
      } else {
        const files = req.files;

        const imageUrls = files.map((file) => file.path); // Lấy đường dẫn URL của các hình ảnh đã tải lên
        console.log(imageUrls);
        const productData = req.body;
        productData.images = imageUrls;
        productData.shop = shop;

        const product = await Product.create(productData);

        res.status(201).json({
          success: true,
          product,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all products of a shop
router.get(
  "/get-all-products-shop/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find({ shopId: req.params.id });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete product of a shop
router.delete(
  "/delete-shop-product/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.params.id;

      const productData = await Product.findById(productId);

      productData.images.forEach((imageUrl) => {
        const filename = imageUrl;
        const filePath = `uploads/${filename}`;

        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });

      const product = await Product.findByIdAndDelete(productId);

      if (!product) {
        return next(
          new ErrorHandler("Không tìm thấy sản phẩm với ID này!", 500)
        );
      }

      res.status(201).json({
        success: true,
        message: "Xóa sản phẩm thành công!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all products
router.get(
  "/get-all-products",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// review for a product
router.put(
  "/create-new-review",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { user, rating, comment, productId, orderId } = req.body;

      const product = await Product.findById(productId);

      const review = {
        user,
        rating,
        comment,
        productId,
      };

      const isReviewed = product.reviews.find(
        (rev) => rev.user._id === req.user._id
      );

      if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.user._id === req.user._id) {
            (rev.rating = rating), (rev.comment = comment), (rev.user = user);
          }
        });
      } else {
        product.reviews.push(review);
      }

      let avg = 0;

      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });

      product.ratings = avg / product.reviews.length;

      await product.save({ validateBeforeSave: false });

      await Order.findByIdAndUpdate(
        orderId,
        { $set: { "cart.$[elem].isReviewed": true } },
        { arrayFilters: [{ "elem._id": productId }], new: true }
      );

      res.status(200).json({
        success: true,
        message: "Đánh giá thành công!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// all products --- for admin
router.get(
  "/admin-all-products",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({
        createdAt: -1,
      });
      res.status(201).json({  
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
<<<<<<< HEAD
// Tìm kiếm snar phẩm theo từ khóa
// router.get(
//   "/search-products",
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const searchTerm = req.query.searchTerm;
//       const products = await Product.find({
//         $or: [
//           { name: { $regex: searchTerm, $options: "i" } },
//           { description: { $regex: searchTerm, $option: "i" } },
//         ],
//       }).sort({ createdAt: -1 });
//       res.status(200).json({
//         success: true,
//         products,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error, 400));
//     }
//   })
// );
// router.put(
//   "/update-product/:id",
//   isSeller, // Middleware to ensure the user is authenticated
//   upload.array("images"),
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       // const productId = req.params.id;
//       const productId = mongoose.Types.ObjectId(req.params.id);
//       const product = await Product.findById(productId);

//       if (!product) {
//         return next(new ErrorHandler("Không tìm thấy sản phẩm với ID này!", 404));
//       }

//       // Kiểm tra xem người dùng có quyền cập nhật sản phẩm (vd. kiểm tra xem họ là người bán hàng)
//       // Đặt điều kiện phù hợp với hệ thống của bạn, ví dụ:
//       if (product.shop.toString() !== req.user.shopId) {
//         return next(new ErrorHandler("Bạn không có quyền cập nhật sản phẩm này", 403));
//       }

//       const shopId = req.body.shopId;
//       const shop = await Shop.findById(shopId);

//       if (!shop) {
//         return next(new ErrorHandler("Id cửa hàng không hợp lệ!", 400));
//       } else {
//         const files = req.files;

//         const imageUrls = files.map((file) => file.path);
//         console.log(imageUrls);
        
//         const productData = req.body;
//         productData.images = imageUrls;
//         productData.shop = shop;

//         // Cập nhật thông tin sản phẩm với dữ liệu mới
//         await Product.findByIdAndUpdate(productId, productData);

//         res.status(200).json({
//           success: true,
//           message: "Cập nhật sản phẩm thành công!",
//         });
//       }
//     } catch (error) {
//       return next(new ErrorHandler(error, 400));
//     }
//   })
// );
// router.put(
//   "/update-product/:id",
//   isSeller, // Add middleware for seller authentication if needed
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const productId = req.params.id;
//       const productData = req.body;

//       // Ensure that the seller is allowed to update this product, for example, by checking if they own the shop associated with the product
//       const product = await Product.findById(productId);
//       if (!product) {
//         return next(new ErrorHandler("Product not found", 404));
//       }

//       // Check if the seller owns the shop associated with the product
//       if (product.shop.toString() !== req.seller.id) {
//         return next(new ErrorHandler("You don't have permission to update this product", 403));
//       }

//       // Dynamically update product attributes based on req.body
//       for (const key in productData) {
//         if (Object.prototype.hasOwnProperty.call(productData, key)) {
//           product[key] = productData[key];
//         }
//       }

//       // Save the updated product
//       const updatedProduct = await product.save();

//       res.status(200).json({
//         success: true,
//         product: updatedProduct,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error, 400));
//     }
//   })
// );
// =======

>>>>>>> origin/backend
module.exports = router;
