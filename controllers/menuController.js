/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MenuItemModel } from "../models/MenuItem.js";

// GET digital menu items
export async function getMenu(req, res, next) {
  try {
    const menu = await MenuItemModel.find();
    res.json(menu);
  } catch (e) {
    next(e);
  }
}

// ADD menu item
export async function addMenuItem(req, res, next) {
  try {
    const newItem = new MenuItemModel({
      id: `menu-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name: req.body.name || "Untitled Item",
      category: req.body.category || "General",
      description: req.body.description || "",
      price: Number(req.body.price) || 0,
      image: req.body.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800",
      availability: req.body.availability !== undefined ? req.body.availability : true,
      popular: req.body.popular || false
    });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (e) {
    next(e);
  }
}

// UPDATE menu item
export async function updateMenuItem(req, res, next) {
  try {
    const updatedItem = await MenuItemModel.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    if (!updatedItem) {
      res.status(404).json({ error: "Item not found" });
      return;
    }
    res.json(updatedItem);
  } catch (e) {
    next(e);
  }
}

// DELETE menu item
export async function deleteMenuItem(req, res, next) {
  try {
    const deletedItem = await MenuItemModel.findOneAndDelete({ id: req.params.id });
    if (!deletedItem) {
      res.status(404).json({ error: "Item not found" });
      return;
    }
    res.json({ success: true, message: "Menu item successfully deleted" });
  } catch (e) {
    next(e);
  }
}
