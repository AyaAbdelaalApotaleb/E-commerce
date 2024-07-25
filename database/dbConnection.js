import mongoose from "mongoose";


export const dbConnection=()=>{
mongoose.connect("mongodb+srv://abdoyoyo14:40001234@cluster0.9pbpvbm.mongodb.net/Ecommerce")
.then(()=>console.log("dataBase connected")).catch((err)=>console.log("dataBase failed",err))
}