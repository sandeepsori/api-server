const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/user/detailSubscription",controller.detailSubscription);
  app.get("/api/user/allSubscription",controller.allSubscription);

  app.post("/api/user/buySubscription",[authJwt.verifyToken, authJwt.isUser,authJwt.getSubscription],controller.buySubscription);
  app.post("/api/user/transactionList",[authJwt.verifyToken, authJwt.isUser],controller.allTransaction);
};