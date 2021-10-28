const express = require("express");
const serveStatic = require("serve-static");
const path = require("path");
const Vue = require("vue");

const server = express();

const renderer = require("vue-server-renderer").createBundleRenderer(
  require("./dist/vue-ssr-bundle.json"),
  {
    template: require("fs").readFileSync("./index.template.html", "utf-8"),
  }
);

const context = {
  title: "vue ssr",
  metas: `
    <meta name="keyword" content="vue,ssr">
    <meta name="description" content="vue srr demo">
  `,
};

//here we are configuring dist to serve server files
server.use("/", serveStatic(path.join(__dirname, "/dist")));

// this * route is to serve project on different page routes except root `/`
server.get(/.*/, function (req, res) {
  renderer.renderToStream({ url: req.path }).pipe(res);
  // res.sendFile(path.join(__dirname, '/dist/index.html'))
});

const port = process.env.PORT || 3000;
server.listen(port);
