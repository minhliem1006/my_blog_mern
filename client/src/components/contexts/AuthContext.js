import { createContext, useReducer,useEffect,useState} from "react";
import { urlApi,L_S_TOKEN } from "./constant";
import axios from 'axios';
import authReducer from '../reducer/authReducer';
const AuthContext = createContext();
const AuthContextProvider=({children})=>{


    const [authState,dispatch] = useReducer(authReducer,{
        authLoading:true,
        isAdmin:false,
        isAuthentication:false,
        user:null,
    })
    const [checkShowDelete,setCheckShowDelete]= useState(false);
    // handle register account
    const registerUser = async(registerForm)=>{
        const {username,password,confirmPassword} = registerForm;
        if(!username||!password||!confirmPassword)
        {
            return {
                success:false,
                message:"Please enter full info!!",
            }
        }
        if(password!==confirmPassword)
        {
            return {
                success:false,
                message:"Password not match",
            }
        }
        try {
            const response = await axios.post(`${urlApi}/api/auth/register`,registerForm);
            if(response.data.success)
            {
                return response.data;
            }
        } catch (error) {
            if(error.response.data)
            {   
                console.log(error.response);
                return error.response.data;
            }
            else
            {
                return {
                    success:false,
                    message:"Invalid server!!"
                }
            }
        } 
    }
    // handle loadUser to authentication account login 
    const loadUser = async()=>
    {
        if(localStorage.getItem(L_S_TOKEN))
        {
            axios.defaults.headers.common['Authorization']=`Bearer ${localStorage.getItem(L_S_TOKEN)}`;
        }
        else
        {
            delete axios.defaults.headers.common['Authorization'];
        }
        try {
            const response = await axios.get(`${urlApi}/api/auth`);
            if(response.data.success)
            {
                if(response.data.user.username ==="admin")
                {
                    dispatch({
                        type:"SET_AUTH",
                        payload:{
                            authLoading:false,
                            isAdmin:true,
                            isAuthentication:true,
                            user:response.data.user,
                        }
                    });
                }
                else
                {
                    dispatch({
                        type:"SET_AUTH",
                        payload:{
                            authLoading:false,
                            isAdmin:false,
                            isAuthentication:true,
                            user:response.data.user,
                        }
                    });
                }
            }
            return response.data;
        } catch (error) {
            console.log(error);
            localStorage.removeItem(L_S_TOKEN);
            delete axios.defaults.headers.common['Authorization'];
            dispatch({
                type:"SET_AUTH",
                payload:{
                    authLoading:false,
                    isAuthentication:false,
                    user:null,
                }
            });
        }
    }
    // loading user to authentication when start  
    useEffect(() => {
      loadUser();
    }, [])
    // // handle login account
    const loginUser = async(loginForm)=>{
        try {
            const response = await axios.post(`${urlApi}/api/auth/login`,loginForm);
            if(response.data.success)
            {   
                localStorage.setItem(L_S_TOKEN,response.data.accessToken);
            }
            await loadUser();
            return response.data;
        } catch (error) {
            if(error.response.data)
            {
                console.log(error.response.data);
                return error.response.data;
            }
            else
            {
                return {
                    success:false,
                    message:"Server missing!!",
                }
            }
        }
    }
      // // handle change account
    const changePass = async(infoChangePass)=>{
        const {password,newPassword,confirmNewPassword} = infoChangePass;
        if(!password||!newPassword||!confirmNewPassword)
        {
            return {
                success:false,
                message:"Please enter full info!!",
            }
        }
        if(newPassword!==confirmNewPassword)
        {
            return {
                success:false,
                message:"New password not match",
            }
        }
        try {
            const response = await axios.patch(`${urlApi}/api/auth/change-password`,infoChangePass);

            if(response.data.success)
            {
                
                return response.data;
            }
        } catch (error) {
            if(error.response.data)
            {   
                console.log(error.response);
                return error.response.data;
            }
            else
            {
                return {
                    success:false,
                    message:"Invalid server!!"
                }
            }
        } 
    }
    // // handle image avatar user 
    const changeImageSubmit = async(dataImage)=>
    {
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        try {
            const res = await axios.patch(`${urlApi}/api/auth/change-image`,dataImage,config);
            if(res.data.success)
            {
                dispatch({
                    type:"SET_USER",
                    payload:{
                        user:res.data.newUser,
                    }
                })
            }
            return res.data
        } catch (error) {
            if(error.res.data)
            {
                return error.res.data;
            }
            else
            {
                return {
                    success:false,
                    message:"Error sever",
                }
            }
        }
    }
    const authContextData={
        loginUser,
        registerUser,
        authState,
        dispatch,
        loadUser,
        changeImageSubmit,
        changePass,
        checkShowDelete,
        setCheckShowDelete,
    }
    return <AuthContext.Provider value={authContextData}>
        {children}
    </AuthContext.Provider>
}
export {AuthContext};
export default AuthContextProvider;