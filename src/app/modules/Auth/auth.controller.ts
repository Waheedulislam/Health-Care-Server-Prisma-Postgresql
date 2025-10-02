import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { authServices } from "./auth.service";
import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status-codes";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);
  const result = await authServices.loginUser(req.body);
  const { refreshToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: false,
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Logged in successfully",

    data: {
      accessToken: result.accessToken,
      needPasswordChange: result.needPasswordChange,
    },
  });
});
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await authServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Access Token generated successfully",
    data: result,

    // data: {
    //   accessToken: result.accessToken,
    //   needPasswordChange: result.needPasswordChange,
    // },
  });
});

const changePassword = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await authServices.changePassword(user, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Password change successfully",
      data: result,
    });
  }
);

const forgetPassword = catchAsync(async (req: Request, res: Response) => {
  await authServices.forgetPassword(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Check your Email",
    data: null,
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization || "";

  await authServices.resetPassword(token, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password reset successfully",
    data: null,
  });
});

export const authController = {
  loginUser,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword,
};
