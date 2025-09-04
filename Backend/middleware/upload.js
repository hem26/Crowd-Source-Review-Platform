const cloudinary = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();

let upload;

if(process.env.NODE_ENV === "production"){
    const storage = new CloudinaryStorage({
        cloudinary:cloudinary,
        params:{
            folder:"ReviewApp",
            allowed_formats:["jpg", "jpeg", "png"]
        },
    });

    upload = multer({storage})
}else{
    const storage = multer.diskStorage({
        destination: function (req, file, cb){
            cb(null, "uploads/");
        },
        filename: function(req, file, cb){
            cb(null, Date.now()+ "-"+ file.originalname);
        }
    })
    upload = multer({storage})
}



module.exports = upload;