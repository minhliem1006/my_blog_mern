const User = require('../models/User');
const argon2 = require('argon2'); // thu vien giup ma hoa
const jwt = require('jsonwebtoken');
require('dotenv').config();
class authController
{
    async check(req,res)
    {
        try {
            const user = await User.findById(req.userId).select("-password");
            if(!user)
            {
                return res.status(400).json({
                    success:false,
                    message:"user not found",
                });
            }
            return res.json({
                success:true,
                user,
            })
        } catch (error) {
      
            return res.status(500).json({success:false,message:"Internal server error"});  
        }
    }
    async register(req,res)
    {
    
        const {username,password} = req.body;
        if(!username||!password)
        {
            return {
                success:false,
                message:"Please enter full info!!!",
            }
        }
        try {
            const user  = await User.findOne({username});
      
            if(user){
                return res.status(400).json({success:false,message:"Username already exist"});
            }
            const hashedPassword = await argon2.hash(password);
        
            const newUser = new User({
                username,
                password:hashedPassword,
            });
            await newUser.save();
            return res.json({
                success:true,message:"Register success!!!",
            });
        }catch (error) {
            return res.status(400).json({
                success:false,message:"sever error",
            });
        }
    }
    /// POST auth/login 
    //find tra ve 1 cai mang rong~.// findOne tra ve null;
    async login(req,res)
    {
     
        const {username,password} = req.body;
        if(!username||!password)
        {
            return res.status(400).json({
                success:false,
                message:"Please enter full info!!!",
            })
        };
        try {
            const user = await User.findOne({username});
        
            if(!user)
            {
                return res.status(400).json({
                    success:false,
                    message:"Incorrect username",
                })
            }
            //const hashedPassword = await argon2.hash(password);
            // verify passWord
            const passwordValid = await argon2.verify(user.password,password);
            if(!passwordValid)
            {
                return res.status(400).json({
                    success:false,
                    message:"Incorrect password",
                })
            }   
            const accessToken = jwt.sign({userId:user._id},process.env.ACCESS_TOKEN_SRCRET);
            return res.status(200).json({
                success:true,
                message:"login success",
                accessToken,
            })
        } catch (error) {
            return res.status(400).json({
                success:false,
                message:"Code login sai roi con trai",
            })
        }
        
    }
    /// [PATCH] auth/change-password 
    async changePassword(req,res)
    {
        // console.log(req.userId);
        const {password,newPassword} = req.body;
        try {
            const user = await User.findOne({_id:req.userId})
 
            if(!user)
            {
                return res.status(400).json({
                    success:false,
                    message:"Incorrect username",
                })
            }
            const passwordValid = await argon2.verify(user.password,password);
            if(!passwordValid)
            {
                return res.status(400).json({
                    success:false,
                    message:"Incorrect password",
                })
            }  
            const hashedPassword = await argon2.hash(newPassword);
            const changePassUser = await User.findByIdAndUpdate({_id:req.userId},{password:hashedPassword});
            return res.status(200).json({
                success:true,
                message:"Update password successfully!!",
            })
        } catch (error) {
   
            return res.status(500).json({success:false,message:"Internal server error"});
        }

    }
      /// [PATCH] auth/change-image 
    async changeImage(req,res)
    {
        ///Model.findByIdAndUpdate() return old object
        
        try {
            const user = await User.findOneAndUpdate({_id:req.userId},{image:req.file.filename}).select("-password");
            if(!user)
            {
                return res.status(400).json({
                    success:false,
                    message:"user not found",
                });
            }
     
        } catch (error) {
            return res.status(500).json({success:false,message:"Internal server error"});
        }
        try {
            const userReturn = await User.findById({_id:req.userId}).select("-password");
            if(!userReturn)
            {
                return res.status(400).json({
                    success:false,
                    message:"user not found",
                });
            }
            return res.status(200).json({
                success:true,
                message:"Update successfully!!",
                newUser:userReturn,
            })
        } catch (error) {
            return res.status(500).json({success:false,message:"Internal server error"});
        }
    }
}
module.exports = new authController ;