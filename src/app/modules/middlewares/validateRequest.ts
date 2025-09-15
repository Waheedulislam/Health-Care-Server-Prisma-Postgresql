import { z, ZodObject } from "zod";
import express, { NextFunction, Request, Response } from "express";

export const validateRequest = (schema: ZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
      });
      return next();
    } catch (error) {
      return next(error);
    }
  };
};
