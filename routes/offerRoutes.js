/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import { getOffers, addOffer, updateOffer, deleteOffer } from "../controllers/offerController.js";

const router = express.Router();

router.get("/", getOffers);
router.post("/", addOffer);
router.put("/:id", updateOffer);
router.delete("/:id", deleteOffer);

export default router;
