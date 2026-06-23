import mongoose from "mongoose";
import User from "./user.model.js";

const companySchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    website:{
        type:String
    },
    location:{
        type:String,
        required:true,
    },
    logo:{
       logoUrl:{type:String,default:""},
       fileName:{type:String,default:""}
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        Ref:"User",
        required:true
    }
},{timestamps:true});


const Company = mongoose.model("Company",companySchema);

export default Company;