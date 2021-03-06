var config = require('../config')
if (!process.env.NODE_ENV) process.env.NODE_ENV = config.dev.env
var path = require('path')
var express = require('express')
var fs = require('fs')
var webpack = require('webpack')
var opn = require('opn')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var fs = require("fs")
var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
//app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

app.get("/wxqb/search/loadTopn",function(req,res){
    var temp = JSON.parse(fs.readFileSync("./json/topn.json"));
    res.json(temp);
});

app.get("/wxqb/search/searchId",function(req,res){
    var temp = JSON.parse(fs.readFileSync("./json/search_result.json"));
    res.json(temp);
});

app.get("/wxqb/search/searchAsso",function(req,res){
    var temp = JSON.parse(fs.readFileSync("./json/searchAsso.json"));
    res.json(temp);
});

app.get("/wxqb/search/searchAsso_init",function(req,res){
    var temp = JSON.parse(fs.readFileSync("./json/searchAsso_init.json"));
    res.json(temp);
});

app.get('/serverInfo',function(req,res){
  var temp = JSON.parse(fs.readFileSync("./mock/serverInfo.json"));
    res.json(temp);
})
app.post("/myupload",function(req,res){
  res.json({msg: "success"});
});
app.post("/management/info/create",function(req,res){
  res.json({msg: "success"});
});


module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  var uri = 'http://localhost:' + port
  console.log('Listening at ' + uri + '\n')
  opn(uri)
})
