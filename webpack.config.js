var path = require("path")

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "index.js",
        library: "react-multi-date-picker",
        libraryTarget: "umd"
    },
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /node-modules/,
            loader: "babel-loader",
            query: {
                presets: ["@babel/preset-react", "@babel/preset-env"]
            }
        }, {
            test: /\.css$/,
            loader: "css-loader"
        }]
    },
    externals: {
        react: "react"
    },
    mode: "production"
}