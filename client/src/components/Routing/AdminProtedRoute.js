import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router";
const AdminProtedRoute = ({children}) => {
    const {authState:{isAdmin,authLoading}} = useContext(AuthContext);
    if(authLoading)
    {
        /// Loading
        return  <div className="center">
                    <div className="loading">

                    </div>
                </div> 
    }   
    // authencation admin ?? or not admin
    if(!isAdmin)
    {
        return <Navigate to="/"></Navigate>
    }
    
    return children; 
}

export default AdminProtedRoute
