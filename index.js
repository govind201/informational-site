const http = require("http");
const fs = require("fs");
const path = require("path");

const startServer = () => {
  const server = http.createServer(handleRequest);
  const port = process.env.PORT || 8080;

  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
};

const handleRequest = (req, res) => {
  let filePath;

  switch (req.url) {
    case "/":
      filePath = getFilePath("index.html");
      break;
    case "/about":
      filePath = getFilePath("about.html");
      break;
    case "/contact-me":
      filePath = getFilePath("contact-me.html");
      break;
    default:
      filePath = getFilePath("404.html");
      break;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      sendResponse(res, 500, "text/plain", "Server Error");
    } else {
      sendResponse(res, 200, "text/html", content);
    }
  });
};

const getFilePath = (filename) => {
  return path.resolve(filename);
};

const sendResponse = (res, statusCode, contentType, content) => {
  res.writeHead(statusCode, { "Content-Type": contentType });
  res.end(content);
};

startServer();
