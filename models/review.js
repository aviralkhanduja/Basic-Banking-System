const mongoose = require('mongoose');
const ReviewSchema = new mongoose.Schema({
      satisfaction:{
          type:String,
          required:true
      },
      scalability:{
        type:Boolean,
        required:true
      },
      user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
      }
},{
    timestamps:true
});

const Review = new mongoose.model('Review', ReviewSchema);

module.exports = Review;