import express from "express";
const router = express.Router();
import validate from "../middleware/validate-middleware.js";
import { contactSchema } from "../validators/contact-validators.js";
import { contact } from "../controllers/contact-controllers.js";

router.route("/contact").post(validate(contactSchema), contact);

export default router;
