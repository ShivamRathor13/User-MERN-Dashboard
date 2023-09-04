const express = require("express");
const newsController = require("./dataFilterApi/newsController");

const router = express.Router();

router.route("/").get(newsController.getAllNews);

module.exports = router;
