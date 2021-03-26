const express = require("express");
const { addItemToCart, getCartItems } = require("../controller/cart");
const { userMiddleware, requireSignin } = require("../MiddleWare");
const router = express.Router();

router.post(
  "/user/cart/addtocart",
  requireSignin,
  userMiddleware,
  addItemToCart
);

router.post("/user/getcartitems", requireSignin, userMiddleware, getCartItems);

module.exports = router;
