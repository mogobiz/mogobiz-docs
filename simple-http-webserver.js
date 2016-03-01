var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs")
    port = process.argv[2] || 9999;

http.createServer(function(request, response) {

  var uri = url.parse(request.url).pathname
    , filename = path.join(process.cwd(), uri);

  var contentTypesByExtension = {
    '.html': "text/html",
    '.css':  "text/css",
    '.js':   "text/javascript",
    '.json': "application/json"
  };

  fs.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }

    if (fs.statSync(filename).isDirectory()) filename += '/index.html';

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {        
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }

      var headers = {};
      var contentType = contentTypesByExtension[path.extname(filename)];
      if (contentType) headers["Content-Type"] = contentType;
      response.writeHead(200, headers);
      response.write(file, "binary");
      response.end();
    });
  });
}).listen(parseInt(port, 10));

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");

/*
var http = require('http')
var url = require('url')
var fs = require('fs')
var baseDirectory = './' //__dirname   // or whatever base directory you want

http.createServer(function (request, response) {
   var requestUrl = url.parse(request.url)
   var fsPath = baseDirectory+requestUrl.pathname
   console.log(fsPath)
   fs.exists(fsPath, function(exists) {
     try {
       if(exists) {
         response.writeHead(200)
         fs.createReadStream(fsPath).pipe(response) // do NOT use fs's sync methods (e.g readFileSync) ANYWHERE on production
       } else {
         response.writeHead(500)
       }
     } finally {
        response.end() // inside finally so errors don't make browsers hang
     } 
   })
}).listen(9999)*/