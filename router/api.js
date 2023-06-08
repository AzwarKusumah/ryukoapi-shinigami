const express = require("express");
const router = express.Router();
const { homeComic,projectList } = require("../controller/apiController");

router.get("/api/home", homeComic);
router.get("/api/project/page/:page", projectList);

module.exports = router;
