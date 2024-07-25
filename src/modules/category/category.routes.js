import express from "express";
import {
  addCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} from "./category.controller.js";
import { validation } from "../../middleware/validation.js";
import {
  addCategoryVal,
  paramsIdVal,
  updateCategoryVal,
} from "./category.validation.js";
import { uploadSingleFile } from "../../services/fileUploads/fileUploads.js";
import subCategoryRouter from "../subcategory/subcategory.routes.js";
import {

  protectdRoutes,
  allowedTo,
} from "../auth/auth.controller.js";

const categoryRouter = express.Router();
categoryRouter.use("/:category/subCategories", subCategoryRouter);

////////category Router/////
categoryRouter
  .route("/")
  .post(
    protectdRoutes,
    allowedTo("admin"),
    uploadSingleFile("image"),
    validation(addCategoryVal),
    addCategory
  )
  .get(getAllCategories);

categoryRouter
  .route("/:id")
  .get(validation(paramsIdVal), getSingleCategory)
  .put(
    protectdRoutes,
    allowedTo("admin"),
    uploadSingleFile("img"),
    validation(updateCategoryVal),
    updateCategory
  )
  .delete(protectdRoutes, allowedTo("admin"),validation(paramsIdVal), deleteCategory);

export default categoryRouter;
