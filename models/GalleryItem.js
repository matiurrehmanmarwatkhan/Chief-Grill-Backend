/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import mongoose from "mongoose";

const GalleryItemSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  title: { type: String }
});

export const GalleryItemModel = mongoose.model("GalleryItem", GalleryItemSchema);
