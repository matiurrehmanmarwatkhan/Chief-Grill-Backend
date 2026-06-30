/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import { loginAdmin } from "../controllers/adminController.js";

const router = express.Router();

router.post("/login", loginAdmin);

export default router;
