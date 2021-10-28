const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "build.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
        exclude: [/node_modules/, /assets/],
      },
      {
        test: /\.vue$/,
        use: ["vue-loader"],
      }, {
        test: /\.(sass|css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [
                require("autoprefixer")()
              ],
            },
          },
          'sass-loader',
        ]
      },
      {
        enforce: "pre",
        test: /\.tsx?$/,
        use: "source-map-loader",
      },
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../"),
    },
    extensions: [".js", ".vue", ".json", ".scss"],
  },
  plugins: [new VueLoaderPlugin()],
};
