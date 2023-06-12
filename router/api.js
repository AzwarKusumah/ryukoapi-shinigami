const express = require("express");
const router = express.Router();
const {
  homeComic,
  projectList,
  searchProject,
  comicDetails,
  comicChapters,
} = require("../controller/apiController");

router.get("/api/home", homeComic);
router.get("/api/project/page/:page", projectList);
router.get("/api/search/:query", searchProject);
router.get("/api/search/:query/page/:page?", searchProject);
router.get("/api/series/:endpoint", comicDetails);
router.get("/api/series/:endpoint/:endpoints", comicChapters);

module.exports = router;
