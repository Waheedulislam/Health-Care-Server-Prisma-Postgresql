import { NextFunction, Request, RequestHandler, Response } from "express";
import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../../shared/catchAsync";
import { DoctorServices } from "./doctor.service";

const getAllDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await DoctorServices.getAllDoctor();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctor data fetched",
    data: result,
  });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await DoctorServices.getByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Admin data fetched",
    data: result,
  });
});
const updateByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await DoctorServices.updateByIdFromDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctor updated successfully",
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await DoctorServices.deleteFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctor data deleted successfully",
    data: result,
  });
});

const softDeleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await DoctorServices.softDeleteFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctor data deleted successfully",
    data: result,
  });
});

export const doctorController = {
  getAllDoctor,
  getByIdFromDB,
  updateByIdFromDB,
  deleteFromDB,
  softDeleteFromDB,
};
