import express from "express";
import {
  addProductVal,
  paramsIdVal,
  updateProductVal,
} from "./product.validation.js";
import { validation } from "../../middleware/validation.js";
import {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "./product.controller.js";
import { uploadFields } from "../../services/fileUploads/fileUploads.js";

const productRouter = express.Router();

////////Brand Router/////
productRouter
  .route("/")
  .post(
    // uploadFields([
    //   { name: "imgCover", maxCount: 1 },
    //   { name: "images", maxCount: 10 },
    // ]),
    // validation(addProductVal),
    addProduct
  )
  .get(getAllProducts);

productRouter
  .route("/:id")
  .get(validation(paramsIdVal), getSingleProduct)
  .put(
    uploadFields([
      { name: "imgCover", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ]),
    validation(updateProductVal),
    updateProduct
  )
  .delete(validation(paramsIdVal), deleteProduct);

export default productRouter;
