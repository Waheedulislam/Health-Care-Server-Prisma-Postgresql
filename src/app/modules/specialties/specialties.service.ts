import { Request } from "express";
import { fileUploader } from "../../../helpers/fileUploader";
import prisma from "../../../shared/prisma";
import { IFile } from "../../interfaces/file";

const getAllSpecialties = async () => {
  const result = await prisma.specialties.findMany();
  return result;
};

const insertIntoDB = async (req: Request) => {
  const file = req.file as IFile;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);

    req.body.icon = uploadToCloudinary?.secure_url;
  }

  const result = await prisma.specialties.create({
    data: req.body,
  });

  return result;
};

const deleteFromDB = async (id: string) => {
  const result = await prisma.specialties.delete({
    where: { id },
  });

  return result;
};

export const SpecialtiesServices = {
  insertIntoDB,
  getAllSpecialties,
  deleteFromDB,
};
