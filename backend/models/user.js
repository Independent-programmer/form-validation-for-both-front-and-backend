const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname:{
    type:String,
    
  },
  lastname:{
    type:String,
  },
  email: {
    type: String,
    
  },
  department: {
    type: String,
    
  },
  subject: {
    type: String,
    
  },
  phonenumber:{
    type:Number,
    
  },
  date: 
    {
      type: Date,
      
    }
  
});

module.exports = mongoose.model("User", userSchema);
