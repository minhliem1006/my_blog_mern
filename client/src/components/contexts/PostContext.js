import { createContext,useReducer,useState,} from "react";
import axios from 'axios';
import postReducer from '../reducer/postReducer';
import {urlApi,POSTS_LOADED_FAIL,POSTS_LOADED_SUCCESS,ADD_POST,
        DELETE_POST,UPDATE_POST,POSTS_ALL_LOADED_SUCCESS,
        POSTS_ALL_LOADED_FAIL,POSTS_TRASH_LOADED_SUCCESS,
        POSTS_TRASH_LOADED_FAIL,DETROY_POST,RESTORE_POST} from './constant';

const PostContext = createContext();
const PostContextProvider = ({children})=>{
    // console.log(user);
    const [postState,dispatch]= useReducer(postReducer,{
        post:null,
        posts:[],
        postsAll:[],
        postsTrash:[],
        postsTrashLoading:true,
        postsAllLoading:true,
        postsLoading:true,
    });
    // initial state when click any post in dashboard
    const [idUpdata,setIdUpdata] = useState();
    // show edit modal in dashboard 
    const [showEditModalPost,setShowEditModalPost]=useState(false);
    // show add modal in dashboard 
    const [showModalAddPost,setShowModalAddPost]=useState(false);
    // show info in page 
    const [showToast,setShowToast]=useState({
        show:false,
        message:'',
        type:null,
    });
    // get all post when go home page with anyone
    const getPostAll = async()=>{
        try {
            const response = await axios.get(`${urlApi}/api/posts/all`);
            if(response.data.success)
            {
                dispatch({
                    type:POSTS_ALL_LOADED_SUCCESS,
                    payload:response.data.postsAll,
                });
            }
            return response.data;
        } catch (error) {
            dispatch({
                type:POSTS_ALL_LOADED_FAIL,
                payload:null,
            });
        }
    }
    // get posts with user login
    const getPost = async()=>{
        try {
            const response = await axios.get(`${urlApi}/api/posts`);
            if(response.data.success)
            {
                dispatch({
                    type:POSTS_LOADED_SUCCESS,
                    payload:response.data.posts,
                });
            }
            return response.data;
        } catch (error) {
            dispatch({
                type:POSTS_LOADED_FAIL,
                payload:null,
            });
        }
    }
    // get trash all posts with admin login
    const getTrashPost=async()=>
    {
        try {
            const response = await axios.get(`${urlApi}/api/posts/trash`);
            if(response.data.success)
            {
                dispatch({
                    type:POSTS_TRASH_LOADED_SUCCESS,
                    payload:response.data.postsTrash,
                });
            }
            return response.data;
        } catch (error) {
            dispatch({
                type:POSTS_TRASH_LOADED_FAIL,
                payload:null,
            });
        }
    }
     // add posts with user login
    const addPost = async(postForm)=>
    {
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        // let fd = new FormData();
        // fd.append(postForm);
        try {

            const response = await axios.post(`${urlApi}/api/posts`,postForm,config);
            if(response.data.success)
            {
                dispatch({
                    type:ADD_POST,
                    payload:response.data.post,
                });
            }
            return response.data;
        } catch (error) {
            if(error.response.data)
            {
                return error.response.data;
            }
            return {
                success:false,
                message:"FE ERROR",
            }
        }
    }
     // delete posts with user login and admin login
    const deletePost = async(postId)=>{
        try {
            const response = await axios.delete(`${urlApi}/api/posts/${postId}`);
            if(response.data.success)
            {
                dispatch({
                    type:DELETE_POST,
                    payload:response.data.postDeleted,
                });
            }
            return response.data;
        } catch (error) {
              if(error.response.data)
              {
                  return error.response.data;
              }
              else
              {
                  return {
                      success:false,
                      message:"Error",
                  }
              }
            }
        }
    // detroy trash with admin login
    const detroyPost = async(postId)=>{
        try {
            const response = await axios.delete(`${urlApi}/api/posts/trash/${postId}`);
            if(response.data.success)
            {
                dispatch({
                    type:DETROY_POST,
                    payload:response.data.postDetroy,
                });
            }
            return response.data;
        } catch (error) {
                if(error.response.data)
                {
                    return error.response.data;
                }
                else
                {
                    return {
                        success:false,
                        message:"Error",
                    }
                }
        }
    }    
     // detroy trash with user login and admin login
    const editPost = async(data)=>{
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        try {

            const response = await axios.put(`${urlApi}/api/posts`,data,config);
            if(response.data.success)
            {
                dispatch({
                    type:UPDATE_POST,
                    payload:response.data.postEdit,
                });
            }
            return response.data;
        } catch (error) {
            if(error.response.data)
            {
                return error.response.data;
            }
            return {
                success:false,
                message:"FE ERROR",
            }
        }
    }
    /// get post detail when click anypost 
    const getPostIdDetail = async(_id)=>{
        try {
            const res = await axios.get(`${urlApi}/api/posts/${_id}`);
            return res.data;
        } catch (error) {
            if(error.response.data)
            {
                return error.response.data;
            }
            return {
                success:false,
                message:"FE ERROR",
            }
        }
    }
    //restore post with admin controller
    const restorePost =async(postId)=>{   
        try {
            const response = await axios.patch(`${urlApi}/api/posts/restore/${postId}`);
            if(response.data.success)
            {
                dispatch({
                    type:RESTORE_POST,
                    payload:response.data.postRestore,
                });
            }
            return response.data;
        } catch (error) {
            if(error.response.data)
            {
                return error.response.data;
            }
            return {
                success:false,
                message:"FE ERROR",
            }
        }
    }
    const postContextData = {
        showModalAddPost,
        setShowModalAddPost,
        addPost,
        getPost,
        deletePost,
        editPost,
        getPostAll,
        showToast,
        setShowToast,
        postState,
        showEditModalPost,
        setShowEditModalPost,
        idUpdata,
        setIdUpdata,
        getPostIdDetail,
        getTrashPost,
        detroyPost,
        restorePost,
    }
    return <PostContext.Provider value={postContextData}>
        {children}
    </PostContext.Provider>
}
export {PostContext};
export default PostContextProvider;