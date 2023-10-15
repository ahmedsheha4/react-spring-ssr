const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");

const srcDirectory = path.join(__dirname, "pages");
const pages = {};

fs.readdirSync(srcDirectory).forEach((file) => {
  if (file.endsWith(".js") || file.endsWith(".jsx")) {
    const name = file.split(".")[0];
    pages[name] = "./pages/" + file;
  }
});

module.exports = {
  entry: { ...pages },

  resolve: {
    extensions: [".js", ".jsx"],
  },
  output: {
    path: path.join(__dirname, "/build"),
    filename: "./static/js/[name].[contenthash].js",
    assetModuleFilename: "./static/[hash][ext][query]",
    clean: true,
  },
  devServer: {
    hot: true,
    open: true,
    port: 3000,
    client: {
      overlay: true,
      progress: true,
    },
  },
  parallelism: 1,
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: Object.keys(pages).map(
    (key) =>
      new HtmlWebpackPlugin({
        template: `./public/${key}.html`,
        filename: `${key}.html`,
        chunks: [key],
      })
  ),
};
