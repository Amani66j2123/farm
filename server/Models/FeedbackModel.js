import mongoose from "mongoose";

const FeedbackSchema=mongoose.Schema({
fullName:{
    type:String,
    required:true,
},
phoneNo:{
    type:Number,
    required:true,
},
email:{
    type:String,
    required:true,
},
date:{
    type:Date,
    required:true,
},
opinionFarm:{
    type:String,
    required:true,
},
opinionServices:{
    type:String,
    required:true,
},
ratingClean:{
    type:String,
    required:true,
},
ratingElectrical:{
    type:String,
    required:true,
},
rentAgain:{
    type:String,
    required:true,
},
details:{
    type:String,
    required:true,
},


});
const FeedbackModel=mongoose.model("farminfos",FeedbackSchema);
export default FeedbackModel;