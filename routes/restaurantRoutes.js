/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import { getRestaurant, updateRestaurant } from "../controllers/restaurantController.js";

const router = express.Router();

router.get("/", getRestaurant);
router.put("/", updateRestaurant);

export default router;
