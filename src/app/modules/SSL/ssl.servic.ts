import axios from "axios";
import config from "../../../config";
import ApiError from "../../Errors/apiError";
import httpStatus from "http-status-codes";
import { IPaymentData } from "./ssl.interface";

const initPayment = async (paymentData: IPaymentData) => {
  const data = {
    store_id: config.SSL.storeId,
    store_passwd: config.SSL.storePass,
    total_amount: paymentData?.amount,
    currency: "BDT",
    tran_id: paymentData.transactionId, // use unique tran_id for each api call
    success_url: config.SSL.success_url,
    fail_url: "http://localhost:3030/fail",
    cancel_url: "http://localhost:3030/cancel",
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "Courier",
    product_name: "Appointment",
    product_category: "Service",
    product_profile: "general",
    cus_name: paymentData.name,
    cus_email: paymentData.email,
    cus_add1: paymentData.address,
    cus_add2: "N/A",
    cus_city: "N/A",
    cus_state: "N/A",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: paymentData.contactNumber,
    cus_fax: "01711111111",
    ship_name: "N/A",
    ship_add1: "N/A",
    ship_add2: "N/A",
    ship_city: "N/A",
    ship_state: "N/A",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };

  const response = await axios({
    method: "post",
    url: "https://sandbox.sslcommerz.com/gwprocess/v3/api.php",
    data: data,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  return response.data;
};

const validatePayment = async (payload: any) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${config.SSL.sslPaymentApi}?val_id=${payload.val_id}&store_id=${config.SSL.storeId}&store_passwd=${config.SSL.storePass}$format=json`,
    });
    return response.data;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Payment validation failed");
  }
};

export const sslServices = {
  initPayment,
  validatePayment,
};
