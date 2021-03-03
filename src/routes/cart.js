const express = require("express");
const { addItemToCart } = require("../controller/cart");
const { userMiddleware, requireSignin } = require("../MiddleWare");
const router = express.Router();

router.post(
  "/user/cart/addtocart",
  requireSignin,
  userMiddleware,
  addItemToCart
);

module.exports = router;
