/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  branchName: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  guestsCount: { type: Number, required: true },
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  customerEmail: { type: String },
  specialRequests: { type: String, default: "" },
  status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
  createdAt: { type: String, required: true }
});

export const ReservationModel = mongoose.model("Reservation", ReservationSchema);
