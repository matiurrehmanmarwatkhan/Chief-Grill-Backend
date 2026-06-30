/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, default: "" },
  date: { type: String, required: true }
});

export const ReviewModel = mongoose.model("Review", ReviewSchema);
