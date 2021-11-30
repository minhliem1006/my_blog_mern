import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router";
const ProtedRoute = ({children}) => {
    const {authState:{authLoading,isAuthentication}} = useContext(AuthContext);
    if(authLoading)
    {
        /// Loading
        return  <div className="center">
                    <div className="loading">

                    </div>
                </div> 
    }   
    // authencaiton user login or not login
    if(!isAuthentication)
    {
        return <Navigate to="/login"></Navigate>
    }
    
    return children; 
}

export default ProtedRoute
