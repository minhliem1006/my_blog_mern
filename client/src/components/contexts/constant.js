export const L_S_TOKEN = "token";
export const urlApi=process.env.NODE_ENV !== "production" ?"http://localhost:5000": 
"https://shrouded-inlet-15017.herokuapp.com";
export const POSTS_LOADED_SUCCESS="POSTS_LOADED_SUCCESS";
export const POSTS_ALL_LOADED_SUCCESS="POSTS_ALL_LOADED_SUCCESS";
export const POSTS_ALL_LOADED_FAIL="POSTS_ALL_LOADED_FAIL";
export const POSTS_LOADED_FAIL="POSTS_LOADED_FAIL";
export const POSTS_TRASH_LOADED_SUCCESS="POSTS_TRASH_LOADED_SUCCESS";
export const POSTS_TRASH_LOADED_FAIL="POSTS_TRASH_LOADED_FAIL";
export const ADD_POST= 'ADD_POST';
export const DELETE_POST= 'DELETE_POST';
export const DETROY_POST= 'DETROY_POST';
export const UPDATE_POST= 'UPDATE_POST';
export const RESTORE_POST= 'RESTORE_POST';
export const FIND_POST= 'FIND_POST';