import express from "express";
import {  addBrandVal ,paramsIdVal ,updateBrandVal ,} from "./brand.validation.js";
import { validation } from "../../middleware/validation.js";
import { addBrand ,getAllBrands ,getSingleBrand,updateBrand ,  deleteBrand} from "./brand.controller.js";
import { uploadSingleFile } from "../../services/fileUploads/fileUploads.js";
const brandRouter=express.Router();


////////Brand Router/////
brandRouter
.route("/")
.post(uploadSingleFile('logo') ,validation(addBrandVal),addBrand)
.get(getAllBrands)




brandRouter
.route("/:id")
.get(validation(paramsIdVal) , getSingleBrand)
.put(uploadSingleFile('logo') ,validation( updateBrandVal) , updateBrand)
.delete(validation(paramsIdVal) ,deleteBrand)




export default brandRouter;