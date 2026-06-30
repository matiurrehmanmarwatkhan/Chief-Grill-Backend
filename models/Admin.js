/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true }
});

export const AdminModel = mongoose.model("Admin", AdminSchema);
