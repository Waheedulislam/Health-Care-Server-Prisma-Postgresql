import axios from "axios";
import config from "../../../config";
import prisma from "../../../shared/prisma";
import { sslServices } from "../SSL/ssl.servic";
import ApiError from "../../Errors/apiError";
import httpStatus from "http-status-codes";
import { PaymentStatus } from "../../../generated/prisma";

const initPayment = async (appointmentId: string) => {
  try {
    const paymentData = await prisma.payment.findFirstOrThrow({
      where: {
        appointmentId,
      },
      include: {
        appointment: {
          include: {
            patient: true,
          },
        },
      },
    });
    const initPaymentData = {
      amount: paymentData.amount,
      transactionId: paymentData.transactionId,
      name: paymentData.appointment.patient.name,
      email: paymentData.appointment.patient.email,
      address: paymentData.appointment.patient.address,
      contactNumber: paymentData.appointment.patient.contactNumber,
    };
    const result = await sslServices.initPayment(initPaymentData);
    return {
      paymentUrl: result.GatewayPageURL,
    };
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Payment error occured");
  }
};

const validatePayment = async (payload: any) => {
  if (!payload || !payload.status || !(payload.status === "VALId")) {
    return {
      message: "Invalid Payment!",
    };
  }
  const response = await sslServices.validatePayment(payload);

  if (response.status === "VALID") {
    return {
      message: "Payment Failed!",
    };
  }

  await prisma.$transaction(async (tx) => {
    const updatedPaymentData = await tx.payment.update({
      where: {
        transactionId: response.tran_id,
      },
      data: {
        status: PaymentStatus.PAID,
        paymentGatewayDate: response,
      },
    });
    await tx.appointment.update({
      where: {
        id: updatedPaymentData.appointmentId,
      },
      data: {
        paymentStatus: PaymentStatus.PAID,
      },
    });
  });
  return {
    message: "Payment Success",
  };
};
export const PaymentServices = {
  initPayment,
  validatePayment,
};
