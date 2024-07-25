import { catchError } from "../../middleware/catchError.js";
import { deleteOne } from "../handlers/handlers.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";
import { reviewModel } from "../../../database/models/review.model.js";
import { AppError } from "../../utils/AppError.js";

const addReview = catchError(async (req, res, next) => {
  req.body.user = req.user._id;
  let isReviewExist = await reviewModel.findOne({
    userId: req.user._id,
    productId: req.body.productId,
  });
  if (isReviewExist) {
    return next(new AppError("you created areview before"));
  } else {
    let review = new reviewModel(req.body);
    await review.save();
    return res.json({ message: "success", review });
  }
});

const getAllReviews = catchError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(reviewModel.find({}), req.query)
    .fields()
    .sort()
    .search()
    .pagination()
    .filter();

  let reviews = await apiFeatures.mongooseQuery;

  res.json({ message: "success", page: apiFeatures.pageNumber, reviews });
});
const getSingleReview = catchError(async (req, res, next) => {
  let review = await reviewModel.findById(req.params.id);

  !review && res.status(404).json({ message: "review not found" });
  review && res.json({ message: "success", review });
});
const updateReview = catchError(async (req, res, next) => {
  req.body.user = req.user._id;
  let review = await reviewModel.findOneAndUpdate(
    { userId: req.body._id, _id: req.params.id },
    req.body,
    { new: true }
  );

  !review && res.status(404).json({ message: "review not found" });
  console.log({ review });

  review && res.json({ message: "success", review });
});

const deleteReview = deleteOne(reviewModel);

catchError(async (req, res, next) => {
  let review = await reviewModel.findByIdAndDelete(req.params.id);

  !review && res.status(404).json({ message: "review not found" });
  review && res.json({ message: "success", review });
});

export {
  addReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
