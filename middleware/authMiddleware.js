/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Simple Authentication Middleware (extendable for session or JWT checks)
export function requireAdmin(req, res, next) {
  // In the current setup, authentication is checked client-side,
  // but this middleware can be added to secure routes on the backend.
  next();
}
