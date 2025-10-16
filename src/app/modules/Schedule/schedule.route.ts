import express from "express";
import { SchedulesController } from "./schedule.controller";
import { auth } from "../middlewares/auth";
import { UserRole } from "../../../generated/prisma";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  SchedulesController.insertIntoDB
);
router.get("/", auth(UserRole.DOCTOR), SchedulesController.getAllFromDB);

export const ScheduleRoutes = router;
