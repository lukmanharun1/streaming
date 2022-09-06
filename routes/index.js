const express = require("express");
const router = express.Router();

const video = require("./video");

router.use("/video", video);

module.exports = router;
