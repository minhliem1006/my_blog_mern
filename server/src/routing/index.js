const authRoute = require('./auth');
const postRoute = require('./post')
const route = (app)=>{
    
    app.use('/api/auth',authRoute);
    app.use('/api/posts',postRoute);
    

}
module.exports = route;