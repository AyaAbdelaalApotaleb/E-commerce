import express from "express";
import { validation } from "../../middleware/validation.js";
import {
  addToWishlistVal,
  paramsIdVal,
} from "./Wishlist.validation.js";
import { addToWishlist,removeFromWishlist,getLoggedUserFromWishlist } from "./wishlist.controller.js";
import { protectdRoutes, allowedTo } from "../auth/auth.controller.js";

const wishlistRouter = express.Router();

////////Wishlist Router/////
wishlistRouter
  .route("/")
  .patch(
    protectdRoutes,
    allowedTo("user"),
    validation(addToWishlistVal),
    addToWishlist
  ).get(getLoggedUserFromWishlist)


 wishlistRouter.route("/:id")
//   .get(validation(paramsIdVal), getSingleWishlist)
//   .put(
//     protectdRoutes,
//     allowedTo("user"),
//     validation(updateWishlistVal),
//     updateWishlist
//   )
  .delete(
    protectdRoutes,
    allowedTo("user", "admin"),
    validation(paramsIdVal),
    removeFromWishlist
  );

export default wishlistRouter;
