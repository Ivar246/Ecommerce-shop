import { Request } from "express";
import path from "path";
import multer from "multer";
import { uploadConfig } from "../config";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: any) => {
    if (file.fieldname === "main_image") {
      cb(null, "./uploads/main");
    } else if (
      file.fieldname === "additional_images" ||
      file.fieldname === "image"
    ) {
      cb(null, "./uploads/additional");
    } else {
      cb(new Error("Invalid upload fieldname"), false);
    }
  },
  filename: async (req: Request, file: Express.Multer.File, cb: any) => {
    let productName = req.body["name"];

    if (!productName) {
      const product = await AppDataSource.getRepository(Product).findOneBy({
        id: +req.params["product_id"],
      });
      productName = product.name;
    }

    const cleanProductName = productName
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, "-");

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    console.log(file.size, uploadConfig.limits);
    const fileName = `${cleanProductName}-${uniqueSuffix}${path.extname(
      file.originalname
    )}`;
    cb(null, fileName);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  const allowedTypes = /jpeg|jpg|png|gif/;

  const mimetype = allowedTypes.test(file.mimetype);

  const extname = allowedTypes.test(path.extname(file.originalname));

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"), false);
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: uploadConfig.limits },
});
