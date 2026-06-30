/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GalleryItemModel } from "../models/GalleryItem.js";

// GET gallery items
export async function getGallery(req, res, next) {
  try {
    const gallery = await GalleryItemModel.find();
    res.json(gallery);
  } catch (e) {
    next(e);
  }
}

// ADD gallery photo
export async function addGalleryItem(req, res, next) {
  try {
    const newItem = new GalleryItemModel({
      id: `gal-${Date.now()}`,
      image: req.body.image || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800",
      category: req.body.category || "food",
      title: req.body.title || "Our Venue Space"
    });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (e) {
    next(e);
  }
}
