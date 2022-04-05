const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Subscription = db.subscription;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      Role.find(
        {
          _id: { $in: user.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
  
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
              next();
              return;
            }
          }
  
          res.status(403).send({ message: "Require Admin Role!" });
          return;
        }
      );
    });
  };
  
  isUser = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      Role.find(
        {
          _id: { $in: user.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
  
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "user") {
              next();
              return;
            }
          }
  
          res.status(403).send({ message: "Require User Role!" });
          return;
        }
      );
    });
  };

  getSubscription = (req, res, next) => {
    Subscription.findById(req.body.subscription_id).exec((err, subs) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      console.log(subs);
      req.name = subs.name;
      req.description = subs.description;
      req.price = subs.price;
      req.duration = subs.duration;
      req.types = subs.types;
      req.bollywood = subs.bollywood;
      req.hollywood = subs.hollywood;
      req.series = subs.series;
      req.livetv = subs.livetv;
      
      
      var duration = subs.duration;
      let today = new Date();
      if(subs.types == 'days'){
        today.setDate(today.getDate() + parseInt(duration));
      }else if(subs.types == 'months'){
        today.setMonth(today.getMonth() + parseInt(duration), 1)
      }else if(subs.types == 'years'){
        today.setFullYear(today.getFullYear() + parseInt(duration));
      }

      req.startFrom = new Date();
      req.endTo = today;

      next();
      return;
  
    });
  };
  
  const authJwt = {
    verifyToken,
    isAdmin,
    isUser,
    getSubscription
  };
  module.exports = authJwt;