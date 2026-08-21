const http = require("http");
const fs = require("fs");
const path = require("path");
const root = __dirname;
const types = { ".html":"text/html; charset=utf-8", ".js":"application/javascript; charset=utf-8", ".css":"text/css; charset=utf-8", ".webmanifest":"application/manifest+json; charset=utf-8" };
http.createServer((req,res)=>{
  const clean = req.url.split("?")[0] === "/" ? "/index.html" : req.url.split("?")[0];
  const file = path.join(root, path.normalize(clean).replace(/^([.][.][/\\])+/,""));
  if(!file.startsWith(root)){res.writeHead(403);return res.end("Forbidden");}
  fs.readFile(file,(error,data)=>{ if(error){res.writeHead(404);return res.end("Not found");} res.writeHead(200,{"Content-Type":types[path.extname(file)]||"application/octet-stream","Cache-Control":"no-store"});res.end(data); });
}).listen(process.env.PORT||4173,"0.0.0.0");
