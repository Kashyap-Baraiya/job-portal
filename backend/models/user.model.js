import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },

    phoneNumber: {
        type: Number,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["student", "recruiter"],
        required: true,
    },
    profile: {
        bio: { type: String },
        skills: [{ type: String }],
        resume: { type: String },
        resumeOriginalname: { type: String },
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
        profilePhoto: {
            url: {
                type: String,
                default: "https://res.cloudinary.com/dktmezpdt/image/upload/v1774536429/profilePhoto/ge2vbppuycnxpbgvawhz.jpg"
            },

            fileName: {
                type: String,
                default: ""
            }

        }

    }

}, { timestamps: true });



const User = mongoose.model("User", userSchema);

export default User;