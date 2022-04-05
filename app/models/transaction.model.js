const mongoose = require("mongoose");

const Transaction = mongoose.model(
  "Transaction",
  new mongoose.Schema({
    user_id:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
    subscription_id:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "Subscription"
        },
    startFrom: Date,
    endTo: Date,
    name: String,
    description: String,
    price: String,
    duration: String, //1,2,3...
    types: String, //day, month, year
    bollywood: Boolean,
    hollywood: Boolean,
    series: Boolean,
    livetv: Boolean,
    status: String, //Active,Deactive
    created_at:{
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    }
  })
);

module.exports = Transaction;