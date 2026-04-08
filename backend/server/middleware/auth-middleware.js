// ✅ Summary
// Checks if an Authorization token is sent in the request headers.
// If not, sends a 401 response.
// Removes the "Bearer " prefix from the token.
// Verifies the JWT using your secret key ,if it is valid then it calls next() otherwise sends a 401 response.
// Looks up the user in the database based on the email.
//select data from database except password
// Attaches user and userID, token to req.
// Calls next() if valid; otherwise, sends a 401 response.

import User from "../models/user-model.js";
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .send({ message: "Unauthorized request no token found" });
  }

  const jwtToken = token.replace("Bearer", "").trim();
  console.log(jwtToken);
  try {
    const isVerify = jwt.verify(jwtToken, process.env.JWT_SECRET);
    console.log(isVerify);
    const userData = await User.findOne({ email: isVerify.email }).select({
      password: 0,
    });
    req.token = jwtToken;
    req.user = userData;
    req.userID = userData._id;

    next();
  } catch (err) {
    return res.status(401).send({ message: "Unauthorized request" });
  }
};

export default authMiddleware;
