const mongoose = require ('mongoose');
const mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema;
const PostSchema = new Schema({

    title:{
        type:String,
        required:true, 
    },
    description:{
        type:String,
    },
    image:{
        type:String,
    },
    new:{
      type:Boolean,  
    },
    user:{
        type:Schema.Types.ObjectId ,  // gan vs useben kia
        ref : 'users' // noi sang collection nao
    }
},
{
    timestamps:true,
});
PostSchema.plugin(mongoose_delete,{ overrideMethods: 'all' });
module.exports = mongoose.model('posts',PostSchema);