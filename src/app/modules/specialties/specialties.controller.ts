import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";

import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status-codes";
import { SpecialtiesServices } from "./specialties.service";

const getAllSpecialties = catchAsync(async (req: Request, res: Response) => {
  const result = await SpecialtiesServices.getAllSpecialties();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Specialties data fetched",
    data: result,
  });
});

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await SpecialtiesServices.insertIntoDB(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Specialties Created Successfully",

    data: result,
  });
});
const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await SpecialtiesServices.deleteFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Specialty deleted successfully",
    data: result,
  });
});

export const SpecialtiesController = {
  insertIntoDB,
  getAllSpecialties,
  deleteFromDB,
};
