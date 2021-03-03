const Cart = require("../models/cart");

exports.addItemToCart = (req, res) => {
  Cart.findOne({ user: req.user._id }).exec((err, cart) => {
    if (err) res.status(400).json({ err });

    if (cart) {
      //HANDLE IF CART ALREADY EXISTS THEN UPDATE CART BY QUANTITY

      const product = req.body.cartItems.product;
      const item = cart.cartItems.find((c) => c.product == product);
      let condition, action;

      if (item) {
        condition = { user: req.user._id, "cartItems.product": product };
        action = {
          $set: {
            "cartItems.$": {
              ...req.body.cartItems,
              quantity: item.quantity + req.body.cartItems.quantity,
            },
          },
        };
      } else {
        condition = { user: req.user._id };
        action = {
          $push: { cartItems: req.body.cartItems },
        };
      }

      Cart.findOneAndUpdate(condition, action).exec((err, _cart) => {
        if (err) res.status(400).json({ err });
        if (_cart) res.status(201).json({ cart: _cart });
      });

      //
    } else {
      const cart = new Cart({
        user: req.user._id,
        cartItems: [req.body.cartItems],
      });

      cart.save((err, cart) => {
        if (err) res.status(400).json({ err });
        if (cart) {
          return res.status(201).json({ cart });
        }
      });
    }
  });
};
