import { z } from "zod";

const createAdmin = z.object({
  password: z.string().min(1, { message: "Password is required" }),

  admin: z.object({
    name: z.string().min(1, { message: "Name is required" }),

    email: z.string().min(1, { message: "Email is required" }),

    contactNumber: z.string(),
  }),
});

export const userValidation = {
  createAdmin,
};
