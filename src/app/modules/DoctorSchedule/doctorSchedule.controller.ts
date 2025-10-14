import { NextFunction, Request, RequestHandler, Response } from "express";
import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../../shared/catchAsync";
import { DoctorScheduleServices } from "./doctorSchedule.service";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  const result = await DoctorScheduleServices.insertIntoDB(user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctor Schedule Insert successfully",
    data: result,
  });
});

export const DoctorScheduleController = {
  insertIntoDB,
};
