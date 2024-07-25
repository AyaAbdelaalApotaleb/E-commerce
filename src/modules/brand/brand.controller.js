
import slugify from "slugify";
import {catchError} from "../../middleware/catchError.js";
import {brandModel} from "../../../database/models/brand.model.js"
import { ApiFeatures } from "../../utils/apiFeatures.js";
const addBrand=catchError( async(req,res,next)=>{
    req.body.slug=slugify(req.body.name)
    req.body.logo= req.file.filename;
  let brand=new brandModel(req.body);
  await brand.save();
  res.json({message:"success",brand})

})
const getAllBrands=catchError(async(req,res,next)=>{
  let apiFeatures=new ApiFeatures( brandModel.find() ,req.query).fields().sort().search().pagination().filter();

  let brands=await apiFeatures.mongooseQuery;
  res.json({message:"success",brands})
  })
const getSingleBrand=catchError( async(req,res,next)=>{
  let brand=await brandModel.findById(req.params.id);
  
  !brand && res.status(404).json({message:"brand not found"})
  brand && res.json({message:"success",brand})  

})
const updateBrand=catchError (async(req,res,next)=>{
   let brand=await brandModel.findByIdAndUpdate(req.params.id ,req.body,{new:true});
   if(req.body.name) {
   req.body.slug= slugify(req.body.name)
   }
    if(req.file){
    req.body.logo= req.file.filename;
    }
    !brand && res.status(404).json({message:"brand not found"})
    brand && res.json({message:"success",brand})
    
  
  })

  const deleteBrand=catchError (async(req,res,next)=>{


    let brand=await brandModel.findByIdAndDelete(req.params.id);
    
   ! brand&& res.status(404).json({message:"brand not found"})
    brand && res.json({message:"success",brand})
    
  
  });








export{ addBrand ,getAllBrands ,getSingleBrand,updateBrand ,  deleteBrand};