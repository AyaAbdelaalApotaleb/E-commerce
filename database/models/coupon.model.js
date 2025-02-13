
import mongoose from "mongoose";

const schema = new mongoose.Schema({
    code: {
        type: String,
        required:true,
        trim: true
    }, 
    expires:Date,
    discount:{
        type:Number,
        required: true,
    }  ,
    createdBy:{type:mongoose.Types.ObjectId,ref:"user"}
  
    
}, { timestamps: true })


export const couponModel = mongoose.model('coupon', schema)







