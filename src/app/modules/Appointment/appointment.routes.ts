import express from "express";
import { appointmentController } from "./appointment.controller";
import { auth } from "../middlewares/auth";
import { UserRole } from "../../../generated/prisma";
const router = express.Router();

router.post(
  "/my-appointment",
  auth(UserRole.PATIENT, UserRole.DOCTOR),
  appointmentController.getMyAppointment
);
router.post(
  "/",
  auth(UserRole.PATIENT),
  appointmentController.createAppointment
);

export const AppointmentRoutes = router;
