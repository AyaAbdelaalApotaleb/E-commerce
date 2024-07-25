import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { catchError } from "../../middleware/catchError.js";
import { userModel } from "../../../database/models/user.model.js";
import { AppError } from "../../utils/AppError.js";


//////////1 sign up////////////////////////
const signup = catchError(async (req, res, next) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (user) {
    return next(new Error("email is already exist !!"));
  }
  const hash = bcrypt.hashSync(req.body.password, 8);
  req.body.hash = hash;
  let newUser = new userModel(req.body);
  await newUser.save();
  const payload = { userId: newUser._id, role: newUser.role };
  let token = jwt.sign(payload, process.env.JWT_KEY);
  res.json({ message: "success", newUser, token });
});
/////////////////////////////// signin////////////////////

const signin = catchError(async (req, res, next) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("invalid email"));
  } else {
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return next(new AppError("invalid password"));
    } else {
      const payload = { userId: user._id, role: user.role };
      let token = jwt.sign(payload, process.env.JWT_KEY);
      return res.json({ message: "user login successfuly", token });
    }
  }
});
////////////changePassword
const changePassword = catchError(async (req, res, next) => {
  let user = await userModel.findOne(req.user._id);
  console.log({ user });
  if (!user) {
    return next(new AppError("invalid user"), 401);
  } else {
    if (!bcrypt.compareSync(req.body.oldPassword, user.password)) {
      return next(new AppError("wrong password"), 401);
    } else {
      const hash = bcrypt.hashSync(req.body.newPassword, 8);
      req.body.hash = hash;
      await userModel.findByIdAndUpdate(req.user._id, {
        password: req.body.newPassword,
        passwordChangedAt: Date.now(),
      });
      return res.json({ message: "password changed successfuly", user });
    }
  }
});

const protectdRoutes = catchError(async (req, res, next) => {
  let { token } = req.headers;
  if (!token) {
    return next(new AppError("token not provided", 401));
  }
  let decoded = jwt.verify(token, process.env.JWT_KEY);
 // console.log(decoded);
  let user = await userModel.findById(decoded.userId);
  if (!user) return next(new AppError("user not found", 401));
  if (user.passwordChangedAt) {
    let time = parseInt(user?.passwordChangedAt.getTime() / 1000);
   console.log(time + "|" + decoded.iat);
    if (time > decoded.iat) {
      return next(new AppError("invalid token login again", 401));
    }
  }
  req.user = user;

  next();
});

const allowedTo = (...roles) => {
  return catchError(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("you are not authorized", 401));
    }

    next();
  });
};

export { signup, signin, changePassword, protectdRoutes, allowedTo };
