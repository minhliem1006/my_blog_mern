const jwt = require('jsonwebtoken');
require('dotenv').config();
const verifyToken=(req,res,next)=>
{

    const authHeader = req.header('Authorization');
    // console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1];
    // console.log(token);
    if(!token)
    {
        console.log('khong co token');
        res.status(401).json({
            success:false,
            message:"access token not found!",
        })
    }
    try {
        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SRCRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({
            success:false,
            message:"invalid token!!",  
        })
    }
}
module.exports = verifyToken ;