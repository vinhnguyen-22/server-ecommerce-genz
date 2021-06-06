const express = require("express");
const { updateOrder } = require("../../controller/admin/order.admin");
const { requireSignin, adminMiddleware } = require("../../MiddleWare");
const router = express.Router();

router.post("/order/update", requireSignin, adminMiddleware, updateOrder);
module.exports = router;
