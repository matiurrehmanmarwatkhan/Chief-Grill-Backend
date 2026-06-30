/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReviewModel } from "../models/Review.js";

// GET testimonials/reviews
export async function getReviews(req, res, next) {
  try {
    const reviews = await ReviewModel.find().sort({ _id: -1 }); // Put newest reviews first
    res.json(reviews);
  } catch (e) {
    next(e);
  }
}

// ADD customer review
export async function addReview(req, res, next) {
  try {
    const newReview = new ReviewModel({
      id: `rev-${Date.now()}`,
      customerName: req.body.customerName || "Anonymous Guest",
      rating: Number(req.body.rating) || 5,
      comment: req.body.comment || "",
      date: new Date().toISOString().split('T')[0]
    });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (e) {
    next(e);
  }
}
