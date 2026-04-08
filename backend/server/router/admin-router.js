import express from "express";
const router = express.Router();
import {
  deleteContactById,
  deleteUserById,
  getAllContacts,
  getAllUsers,
  getContactById,
  getUserById,
  updateContactById,
  UpdateUserById,
} from "../controllers/admin-controllers.js";
import authMiddleware from "../middleware/auth-middleware.js";
import adminMiddleware from "../middleware/admin-middleware.js";

router.route("/users").get(authMiddleware, adminMiddleware, getAllUsers);
//authMiddleware is used to check if the user is authenticated(logged in) have token then only it will allow to access the users admin route otherwise it will return unauthorized error
//adminMiddleware is used to check if the user is admin or not if it is admin then it will allow to access the users admin route otherwise it will return access denied error
router
  .route("/users/delete/:id")
  .delete(authMiddleware, adminMiddleware, deleteUserById);
router.route("/users/:id").get(authMiddleware, adminMiddleware, getUserById);
router
  .route("/users/update/:id")
  .patch(authMiddleware, adminMiddleware, UpdateUserById);

router.route("/contacts").get(authMiddleware, adminMiddleware, getAllContacts);
router
  .route("/contacts/delete/:id")
  .delete(authMiddleware, adminMiddleware, deleteContactById);
router
  .route("/contacts/:id")
  .get(authMiddleware, adminMiddleware, getContactById);
router
  .route("/contacts/update/:id")
  .patch(authMiddleware, adminMiddleware, updateContactById);

export default router;
