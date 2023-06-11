const express = require("express");
const router = express.Router();
const {
  homeComic,
  projectList,
  searchProject,
} = require("../controller/apiController");

router.get("/api/home", homeComic);
router.get("/api/project/page/:page", projectList);
router.get("/api/search/:query", searchProject);
router.get("/api/search/:query/page/:page?", searchProject);

module.exports = router;
