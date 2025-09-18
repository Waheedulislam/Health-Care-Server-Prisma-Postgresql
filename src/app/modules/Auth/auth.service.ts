import { Secret, SignOptions } from "jsonwebtoken";
import config from "../../../config";
import { UserStatus } from "../../../generated/prisma";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import prisma from "../../../shared/prisma";

import bcrypt from "bcrypt";
import emailSender from "./EmailSender";
import ApiError from "../../Errors/apiError";
import httpStatus from "http-status-codes";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );
  if (!isCorrectPassword) {
    throw new Error("Password is incorrect");
  }

  // Token information
  const jwtPayload = {
    email: userData.email,
    role: userData.role,
  };

  // Access token generate
  const accessToken = jwtHelpers.generateToken(
    jwtPayload,
    config.jwt.access_token_secret as Secret,
    config.jwt.access_token_expires_in as SignOptions["expiresIn"]
  );
  // Access token generate
  const refreshToken = jwtHelpers.generateToken(
    jwtPayload,
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expires_in as SignOptions["expiresIn"]
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_token_secret as Secret
    );
  } catch (error) {
    throw new Error("You are not authorized");
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
      status: UserStatus.ACTIVE,
    },
  });

  // Token information
  const jwtPayload = {
    email: userData.email,
    role: userData.role,
  };

  // Access token generate
  const accessToken = jwtHelpers.generateToken(
    jwtPayload,
    config.jwt.access_token_secret as Secret,
    config.jwt.access_token_expires_in as SignOptions["expiresIn"]
  );
  return {
    accessToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const changePassword = async (user: any, payload: any) => {
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );
  if (!isCorrectPassword) {
    throw new Error("Password is incorrect");
  }

  const hashPassword: string = await bcrypt.hash(payload.newPassword, 12);

  await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashPassword,
      needPasswordChange: false,
    },
  });

  return {
    message: "Password change successfully",
  };
};

const forgetPassword = async (payload: { email: string }) => {
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const resetPasswordToken = jwtHelpers.generateToken(
    { email: userData.email, role: userData.role },
    config.jwt.reset_pass_token as Secret,
    config.jwt.reset_pass_token_expires_in as SignOptions["expiresIn"]
  );
  // console.log(resetPasswordToken);
  const resetPasswordLink =
    config.reset_pass_link +
    `?userId=${userData.id}&token=${resetPasswordToken}`;
  await emailSender(
    userData.email,
    `
  <div style="font-family: Arial, sans-serif; background-color:#f9f9f9; padding:20px; text-align:center;">
    <div style="max-width:500px; margin:auto; background:#ffffff; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.1); padding:30px;">
      
      <h2 style="color:#2c3e50; margin-bottom:10px;">Password Reset Request</h2>
      <p style="color:#555; font-size:15px; line-height:1.6;">
        Dear <strong>${userData.email}</strong>,<br/>
        We received a request to reset your password. Click the button below to set a new password:
      </p>

      <a href="${resetPasswordLink}" 
         style="display:inline-block; margin-top:20px; background:#3498db; color:#fff; text-decoration:none; padding:12px 24px; border-radius:6px; font-size:16px; font-weight:bold;">
        Reset Password
      </a>

      <p style="margin-top:25px; font-size:13px; color:#999;">
        If you didn’t request this, you can safely ignore this email.<br/>
        This link will expire soon for your security.
      </p>
    </div>
  </div>
  `
  );
  // console.log(resetPasswordLink);
};

const resetPassword = async (
  token: string,
  payload: { id: string; password: string }
) => {
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      id: payload.id,
      status: UserStatus.ACTIVE,
    },
  });

  const isValidToken = jwtHelpers.verifyToken(
    token,
    config.jwt.reset_pass_token as Secret
  );

  if (!isValidToken) {
    throw new ApiError(httpStatus.FORBIDDEN, "Forbidden!");
  }

  // hash password

  const hashPassword: string = await bcrypt.hash(payload.password, 12);
  // update into database
  await prisma.user.update({
    where: {
      id: userData.id,
    },
    data: {
      password: hashPassword,
      needPasswordChange: false,
    },
  });
};

export const authServices = {
  loginUser,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword,
};
