/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import mongoose from "mongoose";

const BranchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  timings: { type: String, required: true },
  phone: { type: String, required: true },
  whatsapp: { type: String, required: true },
  mapEmbed: { type: String },
  mapLink: { type: String, required: true }
}, { _id: false });

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  established: { type: String, required: true },
  googleRating: { type: Number, required: true },
  googleReviews: { type: Number, required: true },
  averageSpending: { type: String, required: true },
  timings: { type: String, required: true },
  branches: [BranchSchema],
  contact: {
    phone: { type: String, required: true },
    whatsapp: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true }
  },
  socialLinks: {
    facebook: { type: String },
    instagram: { type: String },
    whatsapp: { type: String },
    youtube: { type: String }
  }
});

export const RestaurantModel = mongoose.model("Restaurant", RestaurantSchema);
