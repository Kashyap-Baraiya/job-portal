import mongoose from "mongoose";

const applicationsSchema = new mongoose.Schema({
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job",
        required:true
    },

    status:{
        type:String,
        enum:["pending","accepted","rejected"],
        default:"pending"
    },

    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true});


const Applications = mongoose.model("Applications",applicationsSchema);


export default Applications;