/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import mongoose from "mongoose";

const MenuItemSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, default: "" },
  price: { type: Number, required: true },
  image: { type: String, default: "" },
  availability: { type: Boolean, default: true },
  popular: { type: Boolean, default: false }
});

export const MenuItemModel = mongoose.model("MenuItem", MenuItemSchema);
