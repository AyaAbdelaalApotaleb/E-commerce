import mongoose from "mongoose";
import bcrypt from "bcrypt";
// import { types } from "joi";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: { type: String, required: true },

    isActive: { type: Boolean, default: true },
    isBlocked: { type: Boolean, default: false },
    confirmEmail: { type: Boolean, default: false, lowercase: true },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      lowercase: true,
    },
    passwordChangedAt: Date,
    wishList: [{ type: mongoose.Types.ObjectId, ref: "product" }],
    addressess: [
      {
        street: String,
        phone: String,
        city: String,
      },
    ],
  },
  { timestamps: true,toJSON:{virtuals:true} ,toObject:{virtuals:true}}
);

// schema.pre("save", function () {
//   this.password = bcrypt.hashSync(this.password, 8);
// });

// schema.pre("findOneAndUpdate", function () {
//   this._update.password = bcrypt.hashSync(this._update.password, 8);
// });
export const userModel = mongoose.model("user", schema);
