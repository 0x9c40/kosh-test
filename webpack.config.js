const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const webpack = require("webpack");

module.exports = ({ mode = "production" }) => {
  return {
    mode,
    output: {
      path: path.resolve(__dirname, "docs"),
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader",
        },
        {
          test: /\.js$/,
          loader: "babel-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
      ],
    },
    plugins: [new HtmlWebpackPlugin(), new VueLoaderPlugin(), new webpack.ProgressPlugin()],
  };
};
