import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import categoryRouter from "./src/modules/category/category.routes.js";
import subCategoryRouter from "./src/modules/subcategory/subcategory.routes.js";
import brandRouter from "./src/modules/brand/brand.routes.js";
import productRouter from "./src/modules/product/product.routes.js";
import authRouter from "./src/modules/auth/auth.routes.js";
import { globalError } from "./src/middleware/globalError.js";
import { sendEmail } from "./src/services/emails/sendEmail.js";
import dotenv from "dotenv";
import userRouter from "./src/modules/user/user.routes.js";
import reviewRouter from "./src/modules/review/review.routes.js";
import wishlistRouter from "./src/modules/wishlist/wishlist.routes.js";
import addressRouter from "./src/modules/address/address.routes.js";
import couponRouter from "./src/modules/coupon/coupon.routes.js";
import cartRouter from "./src/modules/cart/cart.routes.js";
dotenv.config();

const app = express();  
app.use(express.json());
dbConnection();
const port = process.env.PORT;
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/subcategories", subCategoryRouter);
app.use("/api/v1/brands", brandRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/reviews",reviewRouter);
app.use("/api/v1/wishlist",wishlistRouter);
app.use("/api/v1/addresses",addressRouter)
app.use("/api/v1/coupons",couponRouter)
app.use("/api/v1/carts",cartRouter)



app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => res.send("Hello World!"));
app.use(globalError);
app.listen(port, () => console.log("app listening on port ", port));
