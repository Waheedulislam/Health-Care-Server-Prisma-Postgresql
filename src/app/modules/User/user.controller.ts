import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.service";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status-codes";
import pick from "../../../shared/pick";
import { useFilterAbleFields } from "./user.constant";
import { IAuthUser } from "../../interfaces/common";

const createAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userServices.createAdmin(req);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin created successfully",
      data: result,
    });
  }
);

const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.createDoctor(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctor created successfully",
    data: result,
  });
});
const createPatient = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.createPatient(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Patient created successfully",
    data: result,
  });
});
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, useFilterAbleFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await userServices.getAllUser(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users data fetched",
    meta: result.meta,
    data: result.data,
  });
});
const changeProfileStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await userServices.changeProfileStatus(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile status changed!",
    data: result,
  });
});

const getMyProfile = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user; // Here the req.user data is getting from controller's auth middleware

    const result = await userServices.getMyProfile(user as IAuthUser);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My profile data fetched!",
      data: result,
    });
  }
);

const updateMyProfile = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;

    const result = await userServices.updateMyProfile(user as IAuthUser, req);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My profile updated",
      data: result,
    });
  }
);

export const userController = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllUsers,
  changeProfileStatus,
  getMyProfile,
  updateMyProfile,
};
