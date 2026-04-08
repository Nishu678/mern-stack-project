import express from "express";
const router = express.Router(); //router is used to organize routes in a single file
// import controllers from "../controllers/auth-controllers.js";
import {
  home,
  register,
  login,
  user,
} from "../controllers/auth-controllers.js";
import validate from "../middleware/validate-middleware.js";
import { loginSchema, signUpSchema } from "../validators/auth-validators.js";
import authMiddleware from "../middleware/auth-middleware.js";

// router.get("/", (req, res) => {
//   res.send("Hello Register!");
// });

// router.route("/").get((req, res) => {
//   res.status(200).send("Hello Login!");
// });
// router.route() is useful when you want to handle multiple HTTP methods on the same path.
//simplify using the controllers
router.route("/").get(home);
router.route("/register").post(validate(signUpSchema), register); //post is used to get the data in payload and send it to the server
router.route("/login").post(validate(loginSchema), login);
router.route("/user").get(authMiddleware, user); //if the user is authenticated(logged in) have token then only it will allow to access the user route otherwise it will return unauthorized error

export default router;
