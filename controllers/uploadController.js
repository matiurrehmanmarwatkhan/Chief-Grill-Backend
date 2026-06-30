/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary if credentials are set
const isCloudinaryConfigured = !!(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  console.log("Cloudinary configured successfully in backend upload controller.");
} else {
  console.log("Cloudinary credentials missing. Uploads will run in mock fallback mode.");
}

// POST upload base64 image data
export async function uploadImage(req, res, next) {
  try {
    const { image } = req.body;
    if (!image) {
      res.status(400).json({ error: "No image data provided" });
      return;
    }

    if (isCloudinaryConfigured) {
      console.log("Uploading image to Cloudinary...");
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: "chief_grill",
      });
      res.json({ url: uploadResponse.secure_url });
    } else {
      console.log("Cloudinary is not configured. Running fallback mock upload.");
      res.json({ url: image });
    }
  } catch (e) {
    console.error("Image upload failure:", e);
    next(e);
  }
}
