
const authReducer = (state,action) => {
    const {type,payload:{authLoading,isAdmin,
        isAuthentication,user}} = action;
    switch (type) {
        case "SET_AUTH":
            return {
                ...state,
                authLoading,
                isAuthentication,
                isAdmin,
                user,
            }  
        case "SET_USER":
            return {
                ...state,
                user:user,
            }          
        default:
            break;
    }
}
export default authReducer
