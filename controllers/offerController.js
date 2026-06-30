/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OfferModel } from "../models/Offer.js";

// GET active offers
export async function getOffers(req, res, next) {
  try {
    const offers = await OfferModel.find();
    res.json(offers);
  } catch (e) {
    next(e);
  }
}

// ADD special offer
export async function addOffer(req, res, next) {
  try {
    const newOffer = new OfferModel({
      id: `offer-${Date.now()}`,
      title: req.body.title || "Special Promotion",
      description: req.body.description || "",
      image: req.body.image || "https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&q=80&w=800",
      expiryDate: req.body.expiryDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      validity: req.body.validity || "Limited Time Offer",
      code: req.body.code || `CG-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
    });
    await newOffer.save();
    res.status(201).json(newOffer);
  } catch (e) {
    next(e);
  }
}

// UPDATE special offer
export async function updateOffer(req, res, next) {
  try {
    const updatedOffer = await OfferModel.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    if (!updatedOffer) {
      res.status(404).json({ error: "Offer not found" });
      return;
    }
    res.json(updatedOffer);
  } catch (e) {
    next(e);
  }
}

// DELETE special offer
export async function deleteOffer(req, res, next) {
  try {
    const deletedOffer = await OfferModel.findOneAndDelete({ id: req.params.id });
    if (!deletedOffer) {
      res.status(404).json({ error: "Offer not found" });
      return;
    }
    res.json({ success: true, message: "Offer successfully deleted" });
  } catch (e) {
    next(e);
  }
}
