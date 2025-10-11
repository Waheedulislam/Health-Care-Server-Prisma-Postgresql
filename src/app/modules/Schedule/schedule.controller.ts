import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";

import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status-codes";
import { SchedulesServices } from "./schedule.service";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await SchedulesServices.insertIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Schedule Created Successfully",

    data: result,
  });
});

export const SchedulesController = {
  insertIntoDB,
};
