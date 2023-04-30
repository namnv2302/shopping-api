const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    role: { type: String, default: "user" },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

userSchema.methods.signToken = async function () {
  const token = jwt.sign(
    { email: this.email, role: this.role },
    process.env.PRIVATE_KEY,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

userSchema.statics.isEmailExisted = async function (email) {
  const user = await this.findOne({ email });
  return !!user;
};

module.exports = mongoose.model("User", userSchema);
