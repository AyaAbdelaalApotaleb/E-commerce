import { catchError } from "../../middleware/catchError.js";
import { deleteOne } from "../handlers/handlers.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";
import { couponModel } from "../../../database/models/coupon.model.js";
import { AppError } from "../../utils/AppError.js";

const addCoupon = catchError(async (req, res, next) => {
  let isCouponExist = await couponModel.findOne({
    code: req.body.code});
  if (isCouponExist) {
    return next(new AppError("Coupon already exist"));
  } else {
    let coupon = new couponModel(req.body);
    await coupon.save();
    return res.json({ message: "success", coupon });
  }
});

const getAllCoupons = catchError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(couponModel.find({}), req.query)
    .fields()
    .sort()
    .search()
    .pagination()
    .filter();

  let coupons = await apiFeatures.mongooseQuery;

  res.json({ message: "success", page: apiFeatures.pageNumber, coupons });
});
const getSingleCoupon = catchError(async (req, res, next) => {
  let coupon = await couponModel.findById(req.params.id);

  !coupon && res.status(404).json({ message: "coupon not found" });
  coupon && res.json({ message: "success", coupon });
});
const updateCoupon = catchError(async (req, res, next) => {
  req.body.user = req.user._id;
  let coupon = await couponModel.findOneAndUpdate(
    { userId: req.body._id, _id: req.params.id },
    req.body,
    { new: true }
  );

  !coupon && res.status(404).json({ message: "coupon not found" });
  console.log({ coupon });

  coupon && res.json({ message: "success", coupon });
});

const deleteCoupon = deleteOne(couponModel);

catchError(async (req, res, next) => {
  let coupon = await couponModel.findByIdAndDelete(req.params.id);

  !coupon && res.status(404).json({ message: "coupon not found" });
  coupon && res.json({ message: "success", coupon });
});

export {
  addCoupon,
  getAllCoupons,
  getSingleCoupon,
  updateCoupon,
  deleteCoupon,
};
