/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RestaurantModel } from "../models/Restaurant.js";

// GET restaurant profile details
export async function getRestaurant(req, res, next) {
  try {
    let restaurant = await RestaurantModel.findOne();
    if (!restaurant) {
      restaurant = new RestaurantModel({
        name: "Chief Grill",
        description: "Experience Peshawar's elite dining brand since 1983.",
        established: "1983",
        googleRating: 4.3,
        googleReviews: 6465,
        averageSpending: "Rs. 1,000 - 2,000",
        timings: "12:00 PM - 02:00 AM",
        branches: [],
        contact: {
          phone: "+92 (91) 584-5555",
          whatsapp: "+923331234567",
          email: "info@chiefgrill.com",
          address: "Bhattani Plaza, 3A Park Avenue, University Town, Peshawar"
        },
        socialLinks: {}
      });
      await restaurant.save();
    }
    res.json(restaurant);
  } catch (e) {
    next(e);
  }
}

// UPDATE restaurant profile details
export async function updateRestaurant(req, res, next) {
  try {
    let restaurant = await RestaurantModel.findOne();
    if (!restaurant) {
      restaurant = new RestaurantModel(req.body);
      await restaurant.save();
    } else {
      Object.assign(restaurant, req.body);
      await restaurant.save();
    }
    res.json(restaurant);
  } catch (e) {
    next(e);
  }
}
