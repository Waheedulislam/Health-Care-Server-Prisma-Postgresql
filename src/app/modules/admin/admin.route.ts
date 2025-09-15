import express from "express";
import { validateRequest } from "../middlewares/validateRequest";
import { adminController } from "./admin.controller";
import { adminValidationSchema } from "./admin.validation";

const router = express.Router();

router.get("/", adminController.getAllAdmin);
router.get("/:id", adminController.getByIdFromDB);
router.patch(
  "/:id",
  validateRequest(adminValidationSchema.update),
  adminController.updateByIdFromDB
);
router.delete("/:id", adminController.deleteFromDB);
router.delete("/soft/:id", adminController.softDeleteFromDB);

export const AdminRoutes = router;
