const express = require("express");
const { createPage } = require("../../controller/admin/page");
const { upload } = require("../../MiddleWare");

const router = express.Router();

router.post(
  "/page/create",
  upload.fields([{ name: "banners" }, { name: "products" }]),
  createPage
);

module.exports = router;
