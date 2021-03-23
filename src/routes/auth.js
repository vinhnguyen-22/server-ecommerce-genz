const express = require("express");
const { signup, signin, signout } = require("../controller/auth");
const { requireSignin } = require("../MiddleWare");
const {
  validateSignupRequest,
  isRequestValidated,
  validateSigninRequest,
} = require("../Validators/auth");
const router = express.Router();

router.post("/signup", validateSignupRequest, isRequestValidated, signup);
router.post("/signin", validateSigninRequest, isRequestValidated, signin);
router.post("/signout", signout);
module.exports = router;
