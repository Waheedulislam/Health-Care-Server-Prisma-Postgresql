import express from "express";
import { adminController } from "./admin.controller";

const router = express.Router();

router.get("/", adminController.getAllAdmin);
router.get("/:id", adminController.getByIdFromDB);
router.patch("/:id", adminController.updateByIdFromDB);
router.delete("/:id", adminController.deleteFromDB);
router.delete("/soft/:id", adminController.softDeleteFromDB);

export const AdminRoutes = router;
