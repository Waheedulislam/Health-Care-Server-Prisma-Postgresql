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
router.patch(
  "/status/:id",
  auth(UserRole.PATIENT),
  appointmentController.changeAppointmentStatus
);

export const AppointmentRoutes = router;
