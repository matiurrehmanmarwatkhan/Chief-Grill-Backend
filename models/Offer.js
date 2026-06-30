/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import mongoose from "mongoose";

const OfferSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
  expiryDate: { type: String, required: true },
  validity: { type: String, required: true },
  code: { type: String }
});

export const OfferModel = mongoose.model("Offer", OfferSchema);
