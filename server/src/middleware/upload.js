const multer = require('multer');

//define storage for the images
const storage = multer.diskStorage({
    destination: function (req,file,callback){
        callback(null,"./public/uploads");
    },
    //add back the extension
    filename:function(req,file,callback){
        callback(null,Date.now() + file.originalname);
    }
})
//upload paramaters for multer


const upload = multer({
    storage:storage,
    limits:{
        fieldSize:2000000,
    },
});
module.exports = upload;