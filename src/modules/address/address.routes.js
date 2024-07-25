import express from "express";
import { validation } from "../../middleware/validation.js";
import {
  addAddressVal,
  paramsIdVal,
} from "./address.validation.js";
import { addAddress,
  removeAddress,getLoggedUserAddresses} from "./address.controller.js";
import { protectdRoutes, allowedTo } from "../auth/auth.controller.js";

const addressRouter = express.Router();

////////address Router/////
addressRouter
  .route("/")
  .patch(
    protectdRoutes,
    allowedTo("admin","user"),
    validation(addAddressVal),
    addAddress).get(protectdRoutes,getLoggedUserAddresses)


 addressRouter.route("/:id")
  .delete(
    protectdRoutes,
    allowedTo("user", "admin"),
    validation(paramsIdVal),
    removeAddress
  );

export default addressRouter;
