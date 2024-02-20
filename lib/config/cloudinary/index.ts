import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDNARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (imagePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      imagePath,
      { public_id: "blog_image" },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          const url = result.secure_url;
          resolve(url);
        }
      }
    );
  });
};

export default uploadImage;
