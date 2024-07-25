import { userModel } from "../../../database/models/user.model.js";
import { catchError } from "../../middleware/catchError.js";

const addToWishlist = catchError(async (req, res, next) => {
  req.params.user = req.user._id;
  let wishlist = await userModel.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { wishlist: req.body.product } },
    { new: true }
  ).populate('wishList')

!wishlist && res.status(404).json({ message: "wishlist not found" })

 
wishlist &&  res.json({ message: "success", wishList: wishlist.wishList })}
)
const removeFromWishlist = catchError(async (req, res, next) => {
  req.params.user = req.user._id;
  let wishlist = await userModel.findByIdAndUpdate(
    req.user._id,
    { $pull: { wishlist: req.params.id } },
    { new: true }
  ).populate('wishList')
  console.log(wishlist);

!wishlist && res.status(404).json({ message: "wishlist not found" })

 
wishlist &&  res.json({ message: "success", wishlist : wishlist.wishList })}
)
const getLoggedUserFromWishlist = catchError(async (req, res, next) => {
  

  let{ wishlist}= await userModel.findById(req.user._id)
  console.log(wishlist);

!wishlist && res.status(404).json({ message: "wishlist not found" })

 
wishlist &&  res.json({ message: "success", wishlist})}
)
export { addToWishlist ,removeFromWishlist,getLoggedUserFromWishlist};
