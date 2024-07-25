import express from "express";
import { validation } from "../../middleware/validation.js";
import { addToCartVal, paramsIdVal, updateQTYVal } from "./cart.validation.js";

import { addTocart, removeItemFromCart,updateQuantity,getLoggedUserCart ,clearUserCart,applyCoupon} from "./cart.controller.js";
import { protectdRoutes, allowedTo } from "../auth/auth.controller.js";

const cartRouter = express.Router();

////////address Router/////
cartRouter
  .route("/")
  .post(protectdRoutes, allowedTo("user"), validation(addToCartVal), addTocart)
.get(protectdRoutes,getLoggedUserCart)
.delete(protectdRoutes,clearUserCart)

cartRouter.post('/applycoupon',protectdRoutes, allowedTo("user"),applyCoupon)
cartRouter
  .route("/:id")
  .delete(
    protectdRoutes,
    allowedTo("user", "admin"),
    validation(paramsIdVal),
    removeItemFromCart
  ).put(
    protectdRoutes,
    allowedTo("user"),
    validation(updateQTYVal),
    updateQuantity
  );

export default cartRouter;
