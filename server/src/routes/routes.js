const authRouter = require("./user/auth.routes");

const routes = (app) => {
  // Auth Routes
  app.use("/api", authRouter);
};
module.exports = routes;
