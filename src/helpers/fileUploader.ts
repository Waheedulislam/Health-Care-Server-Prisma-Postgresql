import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ICloudinaryResponse, IFile } from "../app/interfaces/file";

cloudinary.config({
  cloud_name: "dngzfz0cx",
  api_key: "542393122978517",
  api_secret: "NE1se1Kxn9leMUMdjvygvGd4GF8",
});

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const uploadToCloudinary = async (
  file: IFile
): Promise<ICloudinaryResponse | undefined> => {
  console.log(file);
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,

      (error: Error, result: ICloudinaryResponse) => {
        fs.unlinkSync(file.path);
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
  // try {
  //   const result = await cloudinary.uploader.upload(
  //     "G:/Sql-Prisma/Ph-Healt-Care/uploads/1758866600344-342632798.jpg",
  //     { public_id: "olympic_flag" }
  //   );
  //   console.log("Upload success:", result.secure_url);
  // } catch (error) {
  //   console.error("Upload error:", error);
  // }
};

export const fileUploader = {
  upload,
  uploadToCloudinary,
};
