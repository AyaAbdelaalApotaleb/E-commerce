import { categoryModel } from "./../../../database/models/category.model.js";
import slugify from "slugify";
import { catchError } from "../../middleware/catchError.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";

const addCategory=catchError( async(req,res,next)=>{
  req.body.slug=slugify(req.body.name)
 req.body.image= req.file.filename;
let category=new categoryModel(req.body);
await category.save();
res.json({message:"success",category})

})




const getAllCategories = catchError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(categoryModel.find(), req.query)
    .fields()
    .sort()
    .search()
    .pagination()
    .filter();

  let categories = await apiFeatures.mongooseQuery;

  res.json({ message: "success", categories });
});
const getSingleCategory = catchError(async (req, res, next) => {
  let category = await categoryModel.findById(req.params.id);

  !category && res.status(404).json({ message: "category not found" });
  category && res.json({ message: "success", category });
});
const updateCategory = catchError(async (req, res, next) => {
  let category = await categoryModel.findByIdAndUpdate(
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
  !category && res.status(404).json({ message: "category not found" });
  category && res.json({ message: "success", category });
});

const deleteCategory = catchError(async (req, res, next) => {
  let category = await categoryModel.findByIdAndDelete(req.params.id);

  !category && res.status(404).json({ message: "category not found" });
  category && res.json({ message: "success", category });
});

export {
  addCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
