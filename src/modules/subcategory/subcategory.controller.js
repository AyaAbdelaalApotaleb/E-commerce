import slugify from "slugify";
import { catchError } from "../../middleware/catchError.js";
import { subCategoryModel } from "../../../database/models/subcategory.model.js";
import { deleteOne } from "../handlers/handlers.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";

const addSubCategory = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  let subcategory = new subCategoryModel(req.body);
  await subcategory.save();
  res.json({ message: "success", subcategory });
});
const getAllSubCategories = catchError(async (req, res, next) => {
  let filterObj = {};
  if (req.params.category) {
    filterObj.category = req.params.category;
  }
  let apiFeatures = new ApiFeatures(subCategoryModel.find(filterObj), req.query)
    .fields()
    .sort()
    .search()
    .pagination()
    .filter();

  let subcategories = await apiFeatures.mongooseQuery;

  res.json({ message: "success", page: apiFeatures.pageNumber, subcategories });
});
const getSingleSubCategory = catchError(async (req, res, next) => {
  let subcategory = await subCategoryModel.findById(req.params.id);

  !subcategory && res.status(404).json({ message: "subcategory not found" });
  subcategory && res.json({ message: "success", subcategory });
});
const updateSubCategory = catchError(async (req, res, next) => {
  let subcategory = await subCategoryModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (req.body.name) {
    req.body.slug = slugify(req.body.name);
  }
  if (req.file) {
    req.body.image = req.file.filename;
  }
  !subcategory && res.status(404).json({ message: "subcategory not found" });
  subcategory && res.json({ message: "success", subcategory });
});

const deleteSubCategory = deleteOne(subCategoryModel);

catchError (async(req,res,next)=>{

let subcategory=await subCategoryModel.findByIdAndDelete(req.params.id);

! subcategory&& res.status(404).json({message:"subcategory not found"})
subcategory && res.json({message:"success",subcategory})

});

export {
  addSubCategory,
  getAllSubCategories,
  getSingleSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
