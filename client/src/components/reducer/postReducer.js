import {POSTS_LOADED_FAIL,POSTS_LOADED_SUCCESS,ADD_POST,
        DELETE_POST,UPDATE_POST,POSTS_ALL_LOADED_SUCCESS,
        POSTS_ALL_LOADED_FAIL,POSTS_TRASH_LOADED_FAIL,
        POSTS_TRASH_LOADED_SUCCESS,DETROY_POST,RESTORE_POST} from '../contexts/constant';
const postReducer = (state,action) => {
    const {type,payload} = action;
    switch (type) {
        case POSTS_TRASH_LOADED_SUCCESS:
            return {
               ...state,
               postsTrash:payload,
               postsTrashLoading:false,
            }
        case POSTS_TRASH_LOADED_FAIL:
            return {
                ...state,
                postsTrash:[],
                postsTrashLoading:false,
            } 
        case POSTS_ALL_LOADED_SUCCESS:
            return {
               ...state,
               postsAll:payload,
               postsAllLoading:false,
            }
        case POSTS_ALL_LOADED_FAIL:
            return {
                ...state,
                postsAll:[],
                postsAllLoading:false,
            }     
        case POSTS_LOADED_SUCCESS:
            return {
               ...state,
               posts:payload,
               postsLoading:false,
            } 
        case POSTS_LOADED_FAIL:
            return {
                ...state,
                posts:[],
                postsLoading:false,
            }    
        case ADD_POST:
            return {
                ...state,
                post:payload,
                posts:[...state.posts,payload],
            }   
        case DELETE_POST:
            const newPosts = [...state.posts];
            const newPostsAll = [...state.postsAll]
            const postsFilter = newPosts.filter((post)=>post._id !==payload._id);
            const postsAllFilter = newPostsAll.filter((post)=>post._id !==payload._id);
            return {
                ...state,
                posts:postsFilter,
                postsAll:postsAllFilter,
            } 
            // 
        case DETROY_POST:
            const newPostsTrash = [...state.postsTrash];
            const postsTrashFilter = newPostsTrash.filter((post)=>post._id !==payload._id);
            return {
                ...state,
                postsTrash:postsTrashFilter,
            } 
            //     
        case UPDATE_POST:  
            const Posts = [...state.posts];
            const postChange = Posts.map(post => {
                if(post._id === payload._id)
                {
                    post=payload;
                }
                return post;
            });
            return {
                ...state,
                posts:postChange,
            }  
        case RESTORE_POST:
            const postsTrashNew = [...state.postsTrash];
            const postsTrashNewFilter = postsTrashNew.filter((post)=>post._id !==payload._id);
            return {
                ...state,
                postsTrash:postsTrashNewFilter,
            } 
            //            
        default:
            break;
    }
}

export default postReducer
