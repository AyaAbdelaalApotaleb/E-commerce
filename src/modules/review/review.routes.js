import express from "express";
import { validation } from "../../middleware/validation.js";
import{ addReviewVal, paramsIdVal, updateReviewVal }from "./review.validation.js";
import {
  addReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} from "./review.controller.js";
import {protectdRoutes, allowedTo} from "../../modules/auth/auth.controller.js";

const reviewRouter = express.Router();


////////Review Router/////
reviewRouter
  .route("/")
  .post(protectdRoutes, allowedTo("user"),validation(addReviewVal), addReview)
  .get(getAllReviews);

reviewRouter
  .route("/:id")
  .get(validation(paramsIdVal), getSingleReview)
  .put(protectdRoutes, allowedTo("user"),validation(updateReviewVal), updateReview)
  .delete(protectdRoutes, allowedTo("user","admin"),validation(paramsIdVal), deleteReview);

export default reviewRouter;
