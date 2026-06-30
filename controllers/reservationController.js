/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReservationModel } from "../models/Reservation.js";

// GET reservations list
export async function getReservations(req, res, next) {
  try {
    const reservations = await ReservationModel.find().sort({ _id: -1 });
    res.json(reservations);
  } catch (e) {
    next(e);
  }
}

// ADD reservation
export async function addReservation(req, res, next) {
  try {
    const newReservation = new ReservationModel({
      id: `resv-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      branchName: req.body.branchName || "University Town (Main Branch)",
      date: req.body.date || new Date().toISOString().split('T')[0],
      time: req.body.time || "07:00 PM",
      guestsCount: Number(req.body.guestsCount) || 2,
      customerName: req.body.customerName || "Anonymous Guest",
      customerPhone: req.body.customerPhone || "",
      customerEmail: req.body.customerEmail || "",
      specialRequests: req.body.specialRequests || "",
      status: "pending",
      createdAt: new Date().toISOString()
    });
    await newReservation.save();
    res.status(201).json(newReservation);
  } catch (e) {
    next(e);
  }
}

// UPDATE reservation details/status
export async function updateReservation(req, res, next) {
  try {
    const updatedReservation = await ReservationModel.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    if (!updatedReservation) {
      res.status(404).json({ error: "Reservation not found" });
      return;
    }
    res.json(updatedReservation);
  } catch (e) {
    next(e);
  }
}

// DELETE reservation record
export async function deleteReservation(req, res, next) {
  try {
    const deletedReservation = await ReservationModel.findOneAndDelete({ id: req.params.id });
    if (!deletedReservation) {
      res.status(404).json({ error: "Reservation not found" });
      return;
    }
    res.json({ success: true, message: "Reservation deleted successfully" });
  } catch (e) {
    next(e);
  }
}
