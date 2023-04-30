const User = require("../models/user");
const ErrorResponse = require("../../common/ErrorResponse");
const asyncHandler = require("express-async-handler");

module.exports = {
  // [POST] /api/auth/register
  createUser: asyncHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body;
    if (await User.isEmailExisted(email)) {
      return next(new ErrorResponse("User already exist!", 400));
    }
    const newUser = await User.create({ name, email, password, role });
    return res.status(200).json(newUser);
  }),

  // [POST] /api/auth/login
  login: asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new ErrorResponse('User don"t exist!'));
    }
    if (!(await user.isPasswordMatch(req.body.password))) {
      return next(new ErrorResponse('Email or password don"t correct!', 400));
    }
    const token = await user.signToken();
    res.setHeader("Authorization", "Bearer " + token);
    return res.status(200).json(user);
  }),
};
