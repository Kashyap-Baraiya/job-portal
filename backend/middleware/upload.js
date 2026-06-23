import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinaryConfig.js";
import { format } from "path";


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        if (file.fieldname === "resume") {
            return {
                folder: "resume",
                resource_type: "raw",
               format:"pdf"
            };
        }
        if (file.fieldname === "profilePhoto") {
            return {
                folder: "profilePhoto",
                resource_type: "image",
            }
        }
        if (file.fieldname === "companyPhoto") {
            return {
                folder: "companyPhoto",
                resource_type: "image",
            }
        }
    }
});


const upload = multer({ storage });


export default upload;