const { authJwt } = require("../middlewares");
const controller = require("../controllers/admin.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/admin/createSubscription",[authJwt.verifyToken, authJwt.isAdmin],controller.createSubscription);
  app.post("/api/admin/updateSubscription",[authJwt.verifyToken, authJwt.isAdmin],controller.updateSubscription);
  app.post("/api/admin/deleteSubscription",[authJwt.verifyToken, authJwt.isAdmin],controller.deleteSubscription);
  app.post("/api/admin/detailSubscription",[authJwt.verifyToken, authJwt.isAdmin],controller.detailSubscription);
  app.get("/api/admin/allSubscription",[authJwt.verifyToken, authJwt.isAdmin],controller.allSubscription);

  app.get("/api/admin/transactionList",[authJwt.verifyToken, authJwt.isAdmin],controller.allTransaction);
  app.get("/api/admin/detailTransaction",[authJwt.verifyToken, authJwt.isAdmin],controller.detailTransaction);

  app.get("/api/admin/allUser",[authJwt.verifyToken, authJwt.isAdmin],controller.allUser);
  app.get("/api/admin/detailUser",[authJwt.verifyToken, authJwt.isAdmin],controller.detailUser);

};