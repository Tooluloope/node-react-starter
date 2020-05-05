import  {  useContext } from "react";
import { userContext } from "../../states/auth/auth.context";


const useAuth = () => {
    const {state: {isAuthenticated}} = useContext(userContext);
    return isAuthenticated;

};

export default useAuth;