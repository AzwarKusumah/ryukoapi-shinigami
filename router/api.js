const express = require("express");
const router = express.Router();
const { homeComic } = require("../controller/apiController");

router.get("/api/home", homeComic);

module.exports = router;
