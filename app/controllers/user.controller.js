const mongoose = require("mongoose");
const config = require("../config/auth.config");
const db = require("../models");
const Subscription = db.subscription;
const Transaction = db.transaction;
const User = db.user;

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
  Subscription.find({ status: 'Active'},(err, doc) => {
        if (err) {
          res.status(500).send({ status: false, message: err });
          return;
        }else{
          res.send({ status: true,message: "Subscription retrieved successfully!",data: doc});
        }
      
    });
}


// Subscription
exports.buySubscription = (req, res) => {
  const transaction = new Transaction({
    user_id:req.body.user_id,
    subscription_id:req.body.subscription_id,

    startFrom: req.startFrom,
    endTo: req.endTo,
    name: req.name,
    description: req.description,
    price: req.price,
    duration: req.duration,
    types: req.types,
    bollywood: req.bollywood,
    hollywood: req.hollywood,
    series: req.series,
    livetv: req.livetv,
    status: 'Active',
  });
  transaction.save((err, user) => {
    if (err) {
      res.status(500).send({status:false, message: err });
      return;
    }else{
      res.send({ status: true,message: "Subscription buy successfully!" });
    }
  });
};


// Transaction
exports.allTransaction = (req, res) => {
  Transaction.aggregate([
    { 
      $match: { user_id: mongoose.Types.ObjectId(req.body.user_id) }
    }, 
    {
      $lookup: {
        localField: "user_id",
        from: "users",
        foreignField: "_id",
        as: "userDetails"
      }
      
    }
    
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