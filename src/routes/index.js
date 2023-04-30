const authRouter = require("./auth.router");

function route(app) {
  app.use("/api/auth", authRouter);
}

module.exports = route;
