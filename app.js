const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");

const app = express();
const fs = require("fs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);

app.get("/", (req, res) => {
  try {
    const range = req.headers.range;
    const videoPath = "belajar.mp4";
    // const videoPath = path.join(__dirname, "controllers/belajar.mp4");
    const videoSize = fs.statSync(videoPath).size;
    const chunkSize = 1_000_000; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + chunkSize, videoSize - 1);

    const contentLength = end - start * 1;

    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({
      status: "error",
      message: error.message,
    });
  }
});

module.exports = app;
