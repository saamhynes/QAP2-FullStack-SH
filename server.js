const http = require("http");
const fs = require("fs");
const path = require("path");
const { EventEmitter } = require("events");
const MyLogger = require("./logger");

const myLogger = new MyLogger();

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

const server = http.createServer((req, res) => {
  const url = req.url;

  // Function to serve static files
  const serveStaticFile = (fileName, contentType) => {
    fs.readFile(fileName, "utf8", (err, data) => {
      if (err) {
        console.error(`Error serving ${fileName}: ${err.message}`);
        myLogger.error(`Error serving ${fileName}: ${err.message}`);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
        return;
      }
      console.log(`Served ${fileName} successfully.`);
      myLogger.log(`Served ${fileName} successfully.`);
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    });
  };

  switch (url) {
    case "/":
      // serve the home page
      console.log("Home page requested.");
      myLogger.log("Home page requested.");
      serveStaticFile("Views/home.html", "text/html");
      break;

    case "/about":
      // Read the about.html file from the views folder
      console.log("About page requested.");
      myLogger.log("About page requested.");
      myEmitter.emit("routeAccessed", "/about");
      serveStaticFile("Views/about.html", "text/html");
      break;

    case "/products":
      // Read the products.html file from the views folder
      console.log("Products page requested.");
      myLogger.log("Products page requested.");
      myEmitter.emit("routeAccessed", "/products");
      serveStaticFile("Views/products.html", "text/html");
      break;

    case "/contact":
      // Read the contact.html file from the views folder
      console.log("Contact page requested.");
      myLogger.log("Contact page requested.");
      myEmitter.emit("routeAccessed", "/contact");
      serveStaticFile("Views/contact.html", "text/html");
      break;

    case "/subscribe":
      // Read the subscribe.html file from the views folder
      console.log("Subscribe page requested.");
      myLogger.log("Subscribe page requested.");
      myEmitter.emit("routeAccessed", "/subscribe");
      serveStaticFile("Views/subscribe.html", "text/html");
      break;

    case "/stylesheet.css":
      // Read the stylesheet.css file from the views folder
      console.log("CSS file requested.");
      myLogger.log("CSS file requested.");
      serveStaticFile("Views/stylesheet.css", "text/css");
      break;

    case "/favicon.ico":
      // ignore requests from favicon
      res.writeHead(204); // No content
      res.end();
      break;

    default:
      console.log(`Page not found for URL: ${url}.`);
      myLogger.error(`Page not found for URL: ${url}`);
      myEmitter.emit("routeNotFound", url);
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Page not found");
  }
});

myEmitter.on("routeNotFound", (route) => {
  console.error(`Route not found: ${route}`);
  myLogger.error(`Route not found: ${route}`);
});

// set the srver to listen on port 3000
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  myLogger.log(`Server is running on http://localhost:${port}`);
});
