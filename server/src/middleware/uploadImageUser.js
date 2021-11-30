const multer = require('multer');

//define storage for the images
const storage = multer.diskStorage({
    destination: function (req,file,callback){
        callback(null,"./public/uploadImageUsers");
    },
    //add back the extension
    filename:function(req,file,callback){
        callback(null,Date.now() + file.originalname);
    }
})
//upload paramaters for multer


const uploadImageUser = multer({
    storage:storage,
    limits:{
        fieldSize:2000000,
    },
});
module.exports = uploadImageUser;