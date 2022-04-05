const mongoose = require("mongoose");

const Subscription = mongoose.model(
  "Subscription",
  new mongoose.Schema({
    name: String,
    description: String,
    price: String,
    duration: String, //1,2,3...
    types: String, //days,months,years
    bollywood: Boolean,
    hollywood: Boolean,
    series: Boolean,
    livetv: Boolean,
    status: String,//Active,Deactive,Delete
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

module.exports = Subscription;