import React,{useContext} from 'react';
import RegisterForm from '../layouts/RegisterForm';
import LoginForm from '../layouts/LoginForm';
import { AuthContext } from '../contexts/AuthContext';
import {Navigate,Link} from 'react-router-dom';
const Auth = ({authRoute}) => {
    const {authState:{authLoading,isAuthentication}} = useContext(AuthContext);
    let body;
    // handle show loading in page
    if(authLoading)
    {
        body= <div className="center">
                <div className="loading">

                </div>
            </div> 
    }
    else
    {
        if(isAuthentication)
        {
            return <Navigate to="/dashboard"></Navigate>
        }
        else
        {
            body = (authRoute==='login'&&<LoginForm/>)||(authRoute==='register'&&<RegisterForm/>)
        }
    }
    return (

        <div className="background-login">
            <Link className="goto-blog" to="/">Go to Blog</Link>
            <div className="background-header">
                <h1>WelCome to my blog</h1>
                <h3>Study everyday!!</h3>
                <div>
                    {body}  
                </div>
            </div>
        </div>
    )
}

export default Auth
