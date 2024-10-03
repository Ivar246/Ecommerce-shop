import { Request } from "express";
import path from "path";
import multer from "multer";
import { uploadConfig } from "../config";


// Set up storage for main image
const mainImageStorage = multer.diskStorage({
  destination:  (req:Request, file:Express.Multer.File, cb:any)=> {
   return cb(null, './uploads/main');
  },
  filename:  (req:Request, file:Express.Multer.File, cb:any) =>{
    const productName = req.body["name"]

    const cleanProductName = productName.toLowerCase().replace(/[^a-z0-9]/gi, '-');

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);

    const fileName = `${cleanProductName}-${uniqueSuffix}.${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

// Set up storage for additional images
const additionalImagesStorage = multer.diskStorage({
  destination: function (req:Request, file:Express.Multer.File, cb:any) {
    cb(null, './uploads/additional');
  },

  filename: function (req:Request, file:Express.Multer.File, cb:any) {
    const productName = req.body["name"]

    const cleanProductName = productName.toLowerCase().replace(/[^a-z0-9]/gi, '-');

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);

    const fileName = `${cleanProductName}-${uniqueSuffix}.${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

const fileFilter = (req:Request, file:Express.Multer.File, cb:any) => {
  const allowedTypes = /jpeg|jpg|png|gif/;

  const mimetype = allowedTypes.test(file.mimetype);

  const extname = allowedTypes.test(path.extname(file.originalname));

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed!'), false);
  }
};

// Multer setup
export const uploadMainImage = multer({ storage: mainImageStorage, fileFilter:fileFilter, limits:{fileSize:uploadConfig.limits }});
export const uploadAdditionalImages = multer({ storage: additionalImagesStorage,limits:{fileSize:uploadConfig.limits} });


