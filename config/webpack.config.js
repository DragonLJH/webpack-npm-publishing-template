const path = require("path")

module.exports = {
    entry: path.join(__dirname, "../src/index.js"),
    output: {
        filename: "js/bundle.js",
        path: path.resolve(__dirname, "../dist"),
        clean: true,
    }
}