const http = require("http");
const app = require("./src/config/express.config");

const httpserver = http.createServer(app);

const HOST = "localhost";
const PORT = 9005;

httpserver.listen(PORT, HOST, (err) => {
  if (!err) {
    console.log("Server is connected to PORT: " + PORT);
  } else {
    console.log("Server connection ERR");
  }
});
