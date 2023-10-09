const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;

  switch (url) {
    case "/about":
      // Read the about.html file from the views folder
      console.log("About page requested.");
      fs.readFile("Views/about.html", "utf8", (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Internal Server Error");
          return;
        }

        // Serve the html content as the reponse
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      });
      break;

    case "/products":
      // Read the products.html file from the views folder
      console.log("Products page requested.");
      fs.readFile("Views/products.html", "utf8", (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Internal Server Error");
          return;
        }
        // Serve the html content as the reponse
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      });
      break;

    case "/contact":
      // Read the contact.html file from the views folder
      console.log("Contact page requested.");
      fs.readFile("Views/contact.html", "utf8", (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Internal Server Error");
          return;
        }
        // Serve the html content as the reponse
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      });
      break;

    case "/subscribe":
      // Read the subscribe.html file from the views folder
      console.log("Subscribe page requested.");
      fs.readFile("Views/subscribe.html", "utf8", (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Internal Server Error");
          return;
        }
        // Serve the html content as the reponse
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      });
      break;

    default:
      console.log("Page not found.");
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Page not found");
  }
});

// set the srver to listen on port 3000
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
