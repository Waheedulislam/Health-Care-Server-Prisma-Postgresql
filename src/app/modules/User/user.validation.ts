import { z } from "zod";
import { Gender, UserStatus } from "../../../generated/prisma";

const createAdmin = z.object({
  password: z.string().min(1, { message: "Password is required" }),

  admin: z.object({
    name: z.string().min(1, { message: "Name is required" }),

    email: z.string().min(1, { message: "Email is required" }),

    contactNumber: z.string(),
  }),
});

const createDoctor = z.object({
  password: z.string().min(1, { message: "Password is required" }),

  doctor: z.object({
    name: z.string({ required_error: "Name is required" }),
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
      })
      .email("Invalid email address"),
    contactNumber: z.string({ required_error: "Contact number is required" }),
    address: z.string().optional(),
    registrationNumber: z.string({
      required_error: "Registration Number is required",
    }),
    experience: z.number().optional(),
    gender: z.enum([Gender.MALE, Gender.FEMALE]),
    appointmentFee: z.number({ required_error: "Appointment Fee is required" }),
    qualification: z.string({ required_error: "Qualification is required" }),
    currentWorkingPlace: z.string({
      required_error: "CurrentWorkingPlace is required",
    }),
    designation: z.string({ required_error: "Designation is required" }),
  }),
});
const createPatient = z.object({
  password: z.string(),
  patient: z.object({
    email: z
      .string({
        required_error: "Email is required!",
      })
      .email(),
    name: z.string({
      required_error: "Name is required!",
    }),
    contactNumber: z.string({
      required_error: "Contact number is required!",
    }),
    address: z.string({
      required_error: "Address is required",
    }),
  }),
});
const updateStatus = z.object({
  body: z.object({
    status: z.enum([UserStatus.ACTIVE, UserStatus.BLOCKED, UserStatus.DELETED]),
  }),
});

export const userValidation = {
  createAdmin,
  createDoctor,
  createPatient,
  updateStatus,
};
