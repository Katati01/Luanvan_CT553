const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Shop = require("../model/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const { isSeller } = require("../middleware/auth");
const CoupounCode = require("../model/coupounCode");
const router = express.Router();

// create coupoun code
router.post(
  "/create-coupon-code",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const isCoupounCodeExists = await CoupounCode.find({
        name: req.body.name,
      });

      if (isCoupounCodeExists.length !== 0) {
        return next(new ErrorHandler("Mã giảm giá đã tồn tại!", 400));
      }

      req.body.remainingQuantity = req.body.quantity;

      const coupounCode = await CoupounCode.create(req.body);
      res.status(201).json({
        success: true,
        coupounCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all coupons of a shop
router.get(
  "/get-coupon/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCodes = await CoupounCode.find({ shopId: req.seller.id });
      res.status(201).json({
        success: true,
        couponCodes,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete coupoun code of a shop
router.delete(
  "/delete-coupon/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCode = await CoupounCode.findByIdAndDelete(req.params.id);

      if (!couponCode) {
        return next(new ErrorHandler("Mã giảm giá không tồn tại!", 400));
      }
      res.status(201).json({
        success: true,
        message: "Đã xóa mã giảm giá thành công!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get coupon code value by its name
router.get(
  "/get-coupon-value/:name",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCode = await CoupounCode.findOne({ name: req.params.name });

      res.status(200).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
// router.post(
//   "/apply-coupon/:name",
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const name = req.params.name;

//       // tim ma giam gia theo ten
//       const couponCode = await CoupounCode.findOne({ name });

//       // kiem tra xem ma giam gia co ton tai hay khong
//       if (!couponCode) {
//         return next(new ErrorHandler("Mã giảm giá không tồn tại!", 400));
//       }
//       // kiem tra so luong con lai cua ma giam gia
//       if (couponCode.remainingQuantity <= 0) {
//         return next(new ErrorHandler("Mã giảm giá đã hết!", 400));
//       }

//       const shopId = couponCode.shopId;
//       const couponCodeValue = couponCode.value;

//       // Kiem tra xem ma giam gia co ap dung cho cua hang hien tai khong
//       const isCouponValid = cart.filter((item) => item.shopId === shopId);
//       if (isCouponValid.length === 0) {
//         return next(
//           new ErrorHandler("Mã giảm giá không hợp lệ cho cửa hàng này !")
//         );
//       }

//       // Tinh toan giam gia dua tren gia tri cua ma giam
//       const eligiblePrice = isCouponValid.reduce(
//         (acc, item) => acc + item.qty * item.discountPrice,
//         0
//       );
//       const discountPrice = (eligiblePrice * couponCodeValue) / 100;

//       // Cap nhat so luong con lai cua ma giam gia
//       couponCode.remainingQuantity -= 1;
//       await couponCode.save();

//       res.status(200).json({
//         success: true,
//         discountPrice,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error, 400));
//     }
//   })
// );

// // Đoạn mã xử lý cập nhật số lượng còn lại
router.put(
  "/update-remaining-quantity/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { remainingQuantity } = req.body;
      const couponCode = await CoupounCode.findByIdAndUpdate(
        req.params.id,
        { remainingQuantity },
        { new: true }
      );

      if (!couponCode) {
        return next(new ErrorHandler("Mã giảm giá không tồn tại!", 400));
      }

      res.status(201).json({
        success: true,
        message: "Cập nhật số lượng còn lại thành công!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
