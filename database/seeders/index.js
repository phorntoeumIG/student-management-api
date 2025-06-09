const fs = require("fs");
const path = require("path");

const seeders = {};

// Load all seed files
fs.readdirSync(__dirname)
  .filter(file => file.endsWith(".js") && file !== "index.js")
  .sort()
  .forEach(file => {
    seeders[file] = require(path.join(__dirname, file));
  });

module.exports = seeders;
