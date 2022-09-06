const fs = require("fs/promises");
module.exports = (path) =>
  new Promise((resolve, reject) => {
    fs.stat(path, (err, data) => {
      console.log(`${err} er cok`);
      if (err) reject(err);
      resolve(data);
    });
  });
