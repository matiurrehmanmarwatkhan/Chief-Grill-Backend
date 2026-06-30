/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import { getGallery, addGalleryItem } from "../controllers/galleryController.js";

const router = express.Router();

router.get("/", getGallery);
router.post("/", addGalleryItem);

export default router;
