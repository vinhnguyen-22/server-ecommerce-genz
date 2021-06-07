const express = require("express");
const {
  updateOrder,
  getCustomerOrders,
} = require("../../controller/admin/order.admin");
const { requireSignin, adminMiddleware } = require("../../MiddleWare");
const router = express.Router();

router.post("/order/update", requireSignin, adminMiddleware, updateOrder);
router.post(
  "/order/getCustomerOrders",
  requireSignin,
  adminMiddleware,
  getCustomerOrders
);

module.exports = router;
