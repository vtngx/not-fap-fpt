const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base.config");
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");

module.exports = merge(baseConfig, {
  entry: "./entry-server.js",
  target: "node",
  devtool: "source-map",
  output: {
    libraryTarget: "commonjs2",
  },
  plugins: [new VueSSRServerPlugin()],
});
