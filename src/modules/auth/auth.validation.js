import Joi from "joi";

const signupVal = Joi.object({
  name: Joi.string().min(2).max(30).required().trim(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    .required(),
  rePassword: Joi.valid(Joi.ref("password")).required(),
  role: Joi.string().valid("user", "admin"),
});

const signinVal = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
const changePasswordVal = Joi.object({
  oldPassword:Joi.string().required(),
  newPassword:Joi.string()
  .pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
  .required()

});

export { signupVal, signinVal, changePasswordVal };
