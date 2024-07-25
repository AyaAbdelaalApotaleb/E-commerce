import { catchError } from "../../middleware/catchError.js";
import { userModel } from "../../../database/models/user.model.js";
import { deleteOne } from "../handlers/handlers.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";
const addUser = catchError(async (req, res, next) => {
  let user = new userModel(req.body);
  await user.save();
  return res.json({ message: "success", user });
});
const getAllUsers = catchError(async (req, res, next) => {
  let filterObj = {};
  if (req.params.category) {
    filterObj.category = req.params.category;
  }
  let apiFeatures = new ApiFeatures(userModel.find(filterObj), req.query)
    .fields()
    .sort()
    .search()
    .pagination()
    .filter();

  let users = await apiFeatures.mongooseQuery;

  res.json({ message: "success", page: apiFeatures.pageNumber, users });
});
const getSingleUser = catchError(async (req, res, next) => {
  let user = await userModel.findById(req.params.id);

  !user && res.status(404).json({ message: "user not found" });
  user && res.json({ message: "success", user });
});
const updateUser = catchError(async (req, res, next) => {
  let user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (req.file) {
    req.body.image = req.file.filename;
  }
  !user && res.status(404).json({ message: "user not found" });
  user && res.json({ message: "success", user });
});

const deleteUser = deleteOne(userModel);

// catchError (async(req,res,next)=>{

// let user=await userModel.findByIdAndDelete(req.params.id);

// ! user&& res.status(404).json({message:"User not found"})
// User && res.json({message:"success",User})

// });

export { addUser, getAllUsers, getSingleUser, updateUser, deleteUser };
