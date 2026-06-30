/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import restaurantRoutes from "./restaurantRoutes.js";
import menuRoutes from "./menuRoutes.js";
import offerRoutes from "./offerRoutes.js";
import galleryRoutes from "./galleryRoutes.js";
import reviewRoutes from "./reviewRoutes.js";
import reservationRoutes from "./reservationRoutes.js";
import adminRoutes from "./adminRoutes.js";
import uploadRoutes from "./uploadRoutes.js";

const router = express.Router();

router.use("/restaurant", restaurantRoutes);
router.use("/menu", menuRoutes);
router.use("/offers", offerRoutes);
router.use("/gallery", galleryRoutes);
router.use("/reviews", reviewRoutes);
router.use("/reservations", reservationRoutes);
router.use("/admin", adminRoutes);
router.use("/upload", uploadRoutes);

export default router;
