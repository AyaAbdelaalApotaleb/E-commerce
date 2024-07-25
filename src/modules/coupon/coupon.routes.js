import express from "express";
import { validation } from "../../middleware/validation.js";
import {
  protectdRoutes,
  allowedTo,
} from "../../modules/auth/auth.controller.js";
import {
  addCouponVal,
  paramsIdVal,
  updateCouponVal,
} from "./coupon.validation.js";
import {
  addCoupon,
  getAllCoupons,
  getSingleCoupon,
  updateCoupon,
  deleteCoupon,
} from "./coupon.controller.js";

const couponRouter = express.Router();
couponRouter.use(protectdRoutes,allowedTo('admin'))
////////coupon Router/////
couponRouter
  .route("/")
  .post(validation(addCouponVal), addCoupon)
  .get(getAllCoupons);
couponRouter
  .route("/:id")
  .get(validation(paramsIdVal), getSingleCoupon)
  .put(
    validation(updateCouponVal),
    updateCoupon
  )
  .delete(
    validation(paramsIdVal),
    deleteCoupon
  );

export default couponRouter;
