const fs = require("fs");
const path = require("path");
const fsStat = require("../helper/fsStat");
class VideoController {
  static async getAll(req, res) {
    try {
      const range = req.headers.range;
      // const videoPath = "belajar.mp4";
      const videoPath = path.join(__dirname, "controllers/belajar.mp4");
      const videoSize = fs.statSync(videoPath).size;
      const start = Number(range.replace(/\D/g, ""));
      const end = Math.min(start + chunkSize, videoSize - 1);

      const contentLength = end - start * 1;

      const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mkv",
      };
      res.writeHead(206, headers);
      const videoStream = fs.createReadStream(videoPath, { start, end });
      videoStream.pipe(res);
      // fs.stat(videoPath, (err, stats) => {
      //   console.log(err);
      //   const videoSize = stats.size;
      //   const start = Number(range.replace(/\D/g, ""));
      //   const end = Math.min(start + chunkSize, videoSize - 1);

      //   const contentLength = end - start * 1;

      //   const headers = {
      //     "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      //     "Accept-Ranges": "bytes",
      //     "Content-Length": contentLength,
      //     "Content-Type": "video/mkv",
      //   };
      //   res.writeHead(206, headers);
      //   const videoStream = fs.createReadStream(videoPath, { start, end });
      //   videoStream.pipe(res);
      // });
      // const { size: videoSize } /= await fsStat(videoPath);
      const chunkSize = 1_000_000; // 1MB
    } catch (error) {
      console.log(error);
      return res.status(error.statusCode || 500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

module.exports = VideoController;
