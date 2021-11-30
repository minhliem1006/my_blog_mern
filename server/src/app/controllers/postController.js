const { response } = require('express');
const Post = require('../models/Post');
// const argon2 = require('argon2'); // thu vien giup ma hoa
// const jwt = require('jsonwebtoken');
require('dotenv').config();
class postController
{
    //[GET] api/posts/all
    async getAll(req,res)
    {
        try {
            const response = await Post.find().populate('user',['username']);
            return res.status(200).json({
                success:true,
                message:"Get post success!",
                postsAll:response,
            });
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:"Sever not found data!",
            });
        }
    }
    //[GET] api/posts
    async get(req,res)
    {
        try {
            const response = await Post.find({user:req.userId}).populate('user',['username']);
            return res.status(200).json({
                success:true,
                message:"Get post success!",
                posts:response,
            });
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:"Sever not found data!",
            });
        }

    }
    ///
    async getTrash(req,res)
    {
        try {
            const response = await Post.findDeleted().populate('user',['username']);
            return res.status(200).json({
                success:true,
                message:"Get trash post success!",
                postsTrash:response,
            });
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:"Sever not found data!",
            });
        }
    }
    ////[GET] api/posts/:   
    async getDetailPost(req,res)
    {
        try 
        {
            const post = await Post.findById({_id:req.params._id}).populate('user',['username']);          
            if(!post)
            {
                res.status(400).json({
                    success:false,
                    message:"Post is not exist!!",
                });
            }
            return res.status(200).json({
                success:true,
                message:"Get post detail success!",
                post:post,
            })
        } 
        catch (error) {
            return res.status(500).json({
                success:false,
                message:"internal server error",
            });
        }
    }
    //[POST] api/posts
    async post(req,res)
    {
        const {title,description} = req.body;
        if(!title)
        {
            return res.status(400).json({success:false,message:"title is require!"});
        }
        try {
            const post = {
                title:title,
                description:description,
                // url:(url.startsWith('https://'))? url : `https://${url}`,
                image:req.file&&req.file.filename,
                user: req.userId
            }
            const newPost = new Post(post);
            await newPost.save();
            return res.json({success:true,message:"Create success!!",post: newPost});     
        } catch (error) {
            return res.status(500).json({success:false,message:"internal server error"});
        }
        
    }
    //[DELETE]api/posts/trash/:id
    async detroyPost(req,res)
    {
        try {
            // find nay tra ve object delete
            const response = await Post.findByIdAndDelete({_id:req.params.id});
            return res.status(200).json({
                success:true,   
                message:"Detroy success!!",
                postDetroy:response,
            })
            
        } catch (error) {
            return res.status(500).json({success:false,message:"internal server error"});
        }
    }
    //
    async delete(req,res)
    {
        try {
            // find nay tra ve object delete
            const response = await Post.delete({_id:req.params.id});
            const resReturn = await Post.findOneWithDeleted({_id:req.params.id});
            return res.status(200).json({
                success:true,
                message:"Delete success!!",
                postDeleted:resReturn,
            })
            
        } catch (error) {
            return res.status(500).json({success:false,message:"internal server error"});
        }
    }
    //[PATCH] /api/posts/restore
    async restorePost(req,res)
    {
 
        try {
            const response = await Post.restore({_id:req.params.id});
            const resReturn = await Post.findOne({_id:req.params.id});
            console.log(resReturn);
            return res.status(200).json({
                success:true,
                message:"Restore post success!!",
                postRestore:resReturn,
            })
        } catch (error) {
            
        }
    }
    async update(req,res)
    {

        // console.log(req.file);
        const {title,description,_id} = req.body;
        let image = req.body.image  || req.file.filename;
        if(!title)
        {
            return res.status(400).json({success:false,message:"title is require!"});
        }
        try {
            const editPost = {
                title:title,
                description:description,
                image:image,
                user: req.userId,
                new:true,
            }
            const postUpdateCondition = {_id,user:req.userId};
            const updatedPost = await Post.findOneAndUpdate(postUpdateCondition,editPost,{new:true});
            console.log(updatedPost);
            if(!updatedPost)
            {
                return res.status(401).json({success:false,message:"post not found or user not authorised"});
            }
            return res.json({success:true,message:"Success Update!!!",postEdit:updatedPost});
        } catch (error) {
            return res.status(500).json({success:false,message:"edit internal server error"});
        }
    }
    
}
module.exports = new postController ;