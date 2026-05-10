const express = require("express");
const router = require("./router.config");

require("./mongoose.config");
const app = express();

app.use(express.urlencoded({ limit: "2mb" }));
app.use(express.json({ limit: "2mb" }));
app.use("/api/v1", router);

app.use((req, res, next) => {
  res.status(404).json({
    code: 404,
    message: null,
    status: null,
  });
});

app.use((error, req, res, next) => {
  let msg = error.message ?? "App ERR";
  let status = error.status ?? null;
  let code = error.code ?? 500;
  let detail = error.detail ?? error.details ?? error.error ?? null;

  if (code === 11000) {
    code = 400;
    msg = "Validation failed: User already exists";
  }

  // Ensure code is an integer and a valid HTTP status, else default to 500
  if (typeof code !== "number" || code < 100 || code >= 1000) {
    code = 500;
  }

  res.status(code).json({
    error: detail,
    message: msg,
    status: status,
  });
});

module.exports = app;
