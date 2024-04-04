const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  number: {
    type: Number
  },
  profilepath: {
    type: String,
  },
});

// static signup method
userSchema.statics.signup = async function (
  name,
  username,
  email,
  password,
  number,
  profilepath
) {
  // validation
  if (!email || !password || !username || !name) {
    throw Error("All fields must be filled");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    email,
    password: hash,
    name,
    username,
    number,
    profilepath,
  });

  return user;
};

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
