import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";

import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status-codes";
import { SchedulesServices } from "./schedule.service";
import pick from "../../../shared/pick";
import { IAuthUser } from "../../interfaces/common";

const getAllFromDB = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const filters = pick(req.query, ["startDate", "endDate"]);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const user = req.user;
    const result = await SchedulesServices.getAllFromDB(
      filters,
      options,
      user as IAuthUser
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Get all Schedule  Successfully",

      data: result,
    });
  }
);

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
  getAllFromDB,
};
