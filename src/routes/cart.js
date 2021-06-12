const express = require("express");
const {
  addItemToCart,
  getCartItems,
  removeCartItems,
} = require("../controller/cart");
const { userMiddleware, requireSignin } = require("../MiddleWare");
const router = express.Router();

router.post(
  "/user/cart/addtocart",
  requireSignin,
  userMiddleware,
  addItemToCart
);

router.post("/user/getcartitems", requireSignin, userMiddleware, getCartItems);

router.post(
  "/user/cart/removeItem",
  requireSignin,
  userMiddleware,
  removeCartItems
);

module.exports = router;
