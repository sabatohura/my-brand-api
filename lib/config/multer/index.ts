import * as multer from "multer";
import * as express from "express";

const fileFilter = (req: any, file, cb) => {
  return cb(null, true);
};
const upload = multer({ fileFilter: fileFilter });
export default upload;
