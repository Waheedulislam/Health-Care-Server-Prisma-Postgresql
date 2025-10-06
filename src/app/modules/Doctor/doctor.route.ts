import express from "express";
import { auth } from "../middlewares/auth";
import { UserRole } from "../../../generated/prisma";
import { doctorController } from "./doctor.controller";

const router = express.Router();

router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  doctorController.getAllDoctor
);
router.get(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  doctorController.getByIdFromDB
);
router.patch(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  //   validateRequest(adminValidationSchema.update),
  doctorController.updateByIdFromDB
);
router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  doctorController.deleteFromDB
);
router.delete(
  "/soft/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  doctorController.softDeleteFromDB
);

export const DoctorRoutes = router;
