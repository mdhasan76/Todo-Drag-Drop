import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import Login from "../page/Login"

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    if(loading){
        return <div>Loading....</div>
    } 

    if(!user){
        return <Login/>
    }

    return children
};

export default PrivateRoute;