import mongoose from "mongoose";
//schema is used to define the structure of the document in the database and validate the data and model is used to create the collection(table) in the database
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  //   _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  // phone: {
  //   type: String,
  //   required: true,
  // },
  phone: [
    {
      number: {
        type: String,
        required: true,
      },
    },
  ],
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  console.log("pre middleware", this); //this is used to get the data from the request
  const user = this;
  //it check if the password is modified or not if it is not modified then it will not hash the password and save the user in db
  if (!user.isModified("password")) {
    return next(); //next is used to pass the data to the next middleware means go to next step to save the user in db
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
  } catch (error) {
    next(error);
  }
});

//compare password
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.log(error);
  }
};

//Json web token (jwt) is used for authentication and authorization in web applications.
// Authentication - verifying the identity of the user or client.
// Authorization - determining what resources the user or client has allowed them access to acc. to the authentication.

// Components of a JWT:

// Header: Contains metadata about the token, such as the type of token and the signing algorithm being used.

// Payload: Contains claims or statements about an entity (typically, the user) and additional data. Common claims include user ID, username, and expiration time.

// Signature: To verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way, a signature is included.
// Signature = a secret-based code that proves the token is original and not modified

//Jwt is store on client side in cookies or local storage not in database ,so user doesn’t need to login again and again

//create instance method generateAuthToken which is used to generate the token and return the token not containing the password or other sensitive data and id is converted to string because id is of type object and it will throw error if we don't convert it to string

userSchema.methods.generateAuthToken = async function () {
  try {
    return jwt.sign(
      { userId: this._id.toString(), email: this.email, isAdmin: this.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
  } catch (error) {
    console.log("Token error", error);
  }
};

const User = mongoose.model("User", userSchema);
export default User;
