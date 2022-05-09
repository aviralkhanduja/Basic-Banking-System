const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
      sender:{
        type:String,
        required:true
      },
      receiver:{
        type:String,
        required:true
      },
      semail:{
        type: String,
        required: true,
      },
      remail:{
        type: String,
        required: true,
      },
      amount:{
          type:Number,
          require: true
      },
      description:{
          type:String,
          required:true
      }
},{
    timestamps:true
});

const Transaction = new mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;