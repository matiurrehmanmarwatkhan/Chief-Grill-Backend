/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import { getMenu, addMenuItem, updateMenuItem, deleteMenuItem } from "../controllers/menuController.js";

const router = express.Router();

router.get("/", getMenu);
router.post("/", addMenuItem);
router.put("/:id", updateMenuItem);
router.delete("/:id", deleteMenuItem);

export default router;
