import express from "express";
import { SchedulesController } from "./schedule.controller";

const router = express.Router();

router.post("/", SchedulesController.insertIntoDB);

export const ScheduleRoutes = router;
