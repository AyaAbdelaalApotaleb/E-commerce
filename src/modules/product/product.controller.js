import slugify from "slugify";
import { catchError } from "../../middleware/catchError.js";
import { productModel } from "../../../database/models/product.model.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";
const addProduct = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  // req.body.imgCover = req.files.imgCover[0].filename;
  // req.body.images = req.files.images.map((img) => img.filename);

  let product = new productModel(req.body);
  await product.save();
  res.json({ message: "success", product });
});
const getAllProducts = catchError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(productModel.find(), req.query)
    .fields()
    .sort()
    .search()
    .pagination()
    .filter();

  let products = await apiFeatures.mongooseQuery;

  res.json({ message: "success", page: apiFeatures.pageNumber, products });
});
const getSingleProduct = catchError(async (req, res, next) => {
  let product = await productModel.findById(req.params.id);

  !product && res.status(404).json({ message: "Product not found" });
  product && res.json({ message: "success", product });
});
const updateProduct = catchError(async (req, res, next) => {
  let product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (req.body.imgCover) req.body.imgCover = req.files.imgCover[0].filename;
  if (req.body.images)
    req.body.images = req.files.images.map((img) => img.filename);
  if (req.body.name) {
    req.body.slug = slugify(req.body.title);
  }
  if (req.file) {
    req.body.logo = req.file.filename;
  }
  !product && res.status(404).json({ message: "Product not found" });
  product && res.json({ message: "success", product });
});

const deleteProduct = catchError(async (req, res, next) => {
  let product = await productModel.findByIdAndDelete(req.params.id);

  !product && res.status(404).json({ message: "Product not found" });
  product && res.json({ message: "success", product });
});

export {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
