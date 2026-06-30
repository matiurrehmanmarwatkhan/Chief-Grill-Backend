/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Global Error Handler Middleware
export function errorHandler(err, req, res, next) {
  console.error("Express App Error:", err);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    error: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack
  });
}
