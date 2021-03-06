const express = require("express");
const {
  createProduct,
  getProductsBySlug,
  getProductDetailsById,
  deleteProductById,
  getProducts,
} = require("../controller/product");
const { requireSignin, adminMiddleware } = require("../MiddleWare");
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");

const router = express.Router();

//HANDLE CODE OF LIB MULTER
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });
//HANDLE/>

router.post(
  "/product/create",
  requireSignin,
  adminMiddleware,
  upload.array("productPictures"),
  createProduct
);

router.get("/products/:slug", getProductsBySlug);
router.get("/product/:productId", getProductDetailsById);

router.delete(
  "/product/deleteProductById",
  requireSignin,
  adminMiddleware,
  deleteProductById
);
router.post(
  "/product/getProducts",
  requireSignin,
  adminMiddleware,
  getProducts
);

module.exports = router;
