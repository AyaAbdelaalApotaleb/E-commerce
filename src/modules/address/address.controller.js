import { userModel } from "../../../database/models/user.model.js";
import { catchError } from "../../middleware/catchError.js";

const addAddress = catchError(async (req, res, next) => {
  let address = await userModel.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { addressess: req.body } },
    { new: true }
  )

if(!address) return res.status(404).json({ message: "address not found" })

else{
 res.json({ message: "success", address : address.addressess })
}}
)
const removeAddress = catchError(async (req, res, next) => {
  let address = await userModel.findByIdAndUpdate(
    req.user._id,
    { $pull: { addressess: {_id:req.params.id} }},
    { new: true }
  
  )
  if(!address) return res.status(404).json({ message: "address not found" })

  else{
   res.json({ message: "success", address : address.addressess })
  }}
  )
const getLoggedUserAddresses = catchError(async (req, res, next) => {
  

  let address = await userModel.findById(req.user._id)

!address && res.status(404).json({ message: "address not found" })

 
address &&  res.json({ message: "success",address:address.addressess})}
)
export { addAddress 
  ,removeAddress
  ,getLoggedUserAddresses
};
