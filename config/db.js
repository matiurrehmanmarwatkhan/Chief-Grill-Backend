/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import mongoose from "mongoose";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import { RestaurantModel } from "../models/Restaurant.js";
import { MenuItemModel } from "../models/MenuItem.js";
import { OfferModel } from "../models/Offer.js";
import { GalleryItemModel } from "../models/GalleryItem.js";
import { ReviewModel } from "../models/Review.js";
import { ReservationModel } from "../models/Reservation.js";
import { AdminModel } from "../models/Admin.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Point seed db path to Frontend/data/db.json relative to Backend
const DB_PATH = path.join(__dirname, "..", "..", "Frontend", "data", "db.json");

export async function connectDB() {
  const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/chief_grill";
  console.log(`Connecting to MongoDB...`);
  try {
    await mongoose.connect(mongoUri, {
      dbName: "chief_grill",
      tls: true,
      tlsAllowInvalidCertificates: true
    });
    console.log("MongoDB connected successfully to database: chief_grill");
    
    // Run seeding check
    await seedDatabase();
  } catch (error) {
    console.error("\n==================================================================");
    console.error("🔴 CRITICAL: MongoDB Connection Failed!");
    console.error("Please ensure your IP is whitelisted or MongoDB cluster is accessible.");
    console.error("==================================================================\n");
    console.error("Error details:", error);
    throw error;
  }
}

async function seedDatabase() {
  try {
    const restaurantCount = await RestaurantModel.countDocuments();
    const menuCount = await MenuItemModel.countDocuments();
    const offerCount = await OfferModel.countDocuments();
    const galleryCount = await GalleryItemModel.countDocuments();
    const reviewCount = await ReviewModel.countDocuments();
    const reservationCount = await ReservationModel.countDocuments();
    const adminCount = await AdminModel.countDocuments();

    // If everything is already seeded, skip
    if (restaurantCount > 0 && menuCount > 0 && offerCount > 0 && galleryCount > 0 && reviewCount > 0 && adminCount > 0) {
      console.log("Database already has records. Skipping initial seeding.");
      return;
    }

    let dbData = {};
    try {
      console.log(`Reading default seed data from ${DB_PATH}...`);
      const dataStr = await fs.readFile(DB_PATH, "utf-8");
      dbData = JSON.parse(dataStr);
    } catch (err) {
      console.log("Local seed file db.json not found or failed to read. Skipping static data seeding.");
    }

    if (restaurantCount === 0 && dbData.restaurant) {
      await RestaurantModel.create(dbData.restaurant);
      console.log("Seeded restaurant profile details.");
    }

    if (menuCount === 0 && dbData.menu && dbData.menu.length > 0) {
      await MenuItemModel.insertMany(dbData.menu);
      console.log(`Seeded ${dbData.menu.length} menu items.`);
    }

    if (offerCount === 0 && dbData.offers && dbData.offers.length > 0) {
      await OfferModel.insertMany(dbData.offers);
      console.log(`Seeded ${dbData.offers.length} special offers.`);
    }

    if (galleryCount === 0 && dbData.gallery && dbData.gallery.length > 0) {
      await GalleryItemModel.insertMany(dbData.gallery);
      console.log(`Seeded ${dbData.gallery.length} gallery images.`);
    }

    if (reviewCount === 0 && dbData.reviews && dbData.reviews.length > 0) {
      await ReviewModel.insertMany(dbData.reviews);
      console.log(`Seeded ${dbData.reviews.length} reviews.`);
    }

    if (reservationCount === 0 && dbData.reservations && dbData.reservations.length > 0) {
      await ReservationModel.insertMany(dbData.reservations);
      console.log(`Seeded ${dbData.reservations.length} reservations.`);
    }

    if (adminCount === 0) {
      await AdminModel.create({
        name: "Mati Ur Rehman",
        password: "Sasuke Uchiha"
      });
      console.log("Seeded admin credentials.");
    }

    console.log("Initial database seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}
