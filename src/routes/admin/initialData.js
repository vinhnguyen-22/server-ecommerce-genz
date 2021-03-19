const express = require("express");
const { initialData } = require("../../controller/admin/initialData");
const { requireSignin, adminMiddleware } = require("../../MiddleWare");

const router = express.Router();

router.post("/initialdata", requireSignin, adminMiddleware, initialData);

module.exports = router;
