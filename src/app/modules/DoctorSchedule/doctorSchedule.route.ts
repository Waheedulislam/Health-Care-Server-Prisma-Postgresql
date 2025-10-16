import express from "express";
import { auth } from "../middlewares/auth";
import { UserRole } from "../../../generated/prisma";
import { DoctorScheduleController } from "./doctorSchedule.controller";

const router = express.Router();

router.post("/", auth(UserRole.DOCTOR), DoctorScheduleController.insertIntoDB);
router.get(
  "/my-schedule",
  auth(UserRole.DOCTOR),
  DoctorScheduleController.getMySchedule
);
router.delete(
  "/:id",
  auth(UserRole.DOCTOR),
  DoctorScheduleController.deleteFromDB
);
export const DoctorScheduleRoutes = router;
