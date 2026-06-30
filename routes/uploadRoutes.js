/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import { uploadImage } from "../controllers/uploadController.js";

const router = express.Router();

router.post("/", uploadImage);

export default router;
