/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AdminModel } from "../models/Admin.js";

// POST admin credentials verification
export async function loginAdmin(req, res, next) {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      res.status(400).json({ error: "Name and password are required" });
      return;
    }
    const admin = await AdminModel.findOne({ name, password });
    if (admin) {
      res.json({ success: true, message: "Login successful" });
    } else {
      res.status(401).json({ error: "Invalid name or password" });
    }
  } catch (e) {
    next(e);
  }
}
