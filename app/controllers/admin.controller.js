const mongoose = require("mongoose");
const config = require("../config/auth.config");
const db = require("../models");
const Subscription = db.subscription;
const Transaction = db.transaction;
const User = db.user;

// Subscription
exports.createSubscription = (req, res) => {
  const subscription = new Subscription({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    duration: req.body.duration,
    types: req.body.types,
    bollywood: req.body.bollywood,
    hollywood: req.body.hollywood,
    series: req.body.series,
    livetv: req.body.livetv,
    status: 'Active',
  });
  subscription.save((err, user) => {
    if (err) {
      res.status(500).send({status:false, message: err });
      return;
    }else{
      res.send({ status: true,message: "Subscription created successfully!" });
    }
  });
};

exports.updateSubscription = (req, res) => {
  Subscription.findOneAndUpdate({ _id: req.body.id }, 
      {
      $set: {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            duration: req.body.duration,
            types: req.body.types,
            bollywood: req.body.bollywood,
            hollywood: req.body.hollywood,
            series: req.body.series,
            livetv: req.body.livetv,
            status: req.body.status,
        }
     },

    { new: true }, (err, doc) => {
        if (err) {
          res.status(500).send({ status: false, message: err });
          return;
        }else{
          res.send({ status: true,message: "Subscription updated successfully!" });
        }
      
    });
}
exports.deleteSubscription = (req, res) => {
  Subscription.findOneAndUpdate({ _id: req.body.id }, 
      {
      $set: {
            status: 'Delete',
        }
     },

    { new: true }, (err, doc) => {
        if (err) {
          res.status(500).send({ status: false, message: err });
          return;
        }else{
          res.send({ status: true,message: "Subscription deleted successfully!" });
        }
      
    });
}
exports.detailSubscription = (req, res) => {
  Subscription.findOne({ _id: req.body.id },(err, doc) => {
        if (err) {
          res.status(500).send({ status: false, message: err });
          return;
        }else{
          res.send({ status: true,message: "Subscription retrieved successfully!",data: doc});
        }
      
    });
}

exports.allSubscription = (req, res) => {
  Subscription.find({ status: {$ne: 'Delete'}},(err, doc) => {
        if (err) {
          res.status(500).send({ status: false, message: err });
          return;
        }else{
          res.send({ status: true,message: "Subscription retrieved successfully!",data: doc});
        }
      
    });
}

// Transaction
exports.allTransaction = (req, res) => {
  Transaction.aggregate([
    {
      $lookup: {
        localField: "user_id",
        from: "users",
        foreignField: "_id",
        as: "userDetails"
      }
      
    },
    
  ]).sort({_id: -1})
  //.select("_id title link start_date")
  .exec()
  .then(docs => {
    const response = {
      list: docs.map(doc => {
        return {
          _id: doc._id,
          startFrom: doc.startFrom,
          endTo: doc.endTo,
          name: doc.name,
          description: doc.description,
          price: doc.price,
          duration: doc.duration,
          types: doc.types,
          bollywood: doc.bollywood,
          hollywood: doc.hollywood,
          series: doc.series,
          livetv: doc.livetv,
          user_name : doc.userDetails[0].username,
          user_email : doc.userDetails[0].email,

         };
      })
    };
    res.status(200).json(response);
    
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
  
};

exports.detailTransaction = (req, res) => {
  Subscription.findOne({ _id: req.body.id },(err, doc) => {
        if (err) {
          res.status(500).send({ status: false, message: err });
          return;
        }else{
          res.send({ status: true,message: "Transaction retrieved successfully!", data:doc});
        }
      
    });
}


// User
exports.allUser = (req, res) => {
  User.find((err, doc) => {
        if (err) {
          res.status(500).send({ status: false, message: err });
          return;
        }else{
          res.send({ status: true,message: "User retrieved successfully!" });
        }
      
    });
}

exports.detailUser = (req, res) => {
  User.findOne({ _id: req.body.id },(err, doc) => {
        if (err) {
          res.status(500).send({ status: false, message: err });
          return;
        }else{
          res.send({ status: true,message: "User retrieved successfully!" });
        }
      
    });
}