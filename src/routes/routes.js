import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../page/Home";
import Login from "../page/Login";
import SignUp from "../page/SignUp";
import PrivateRoute from "./PrivateRoute";
import Massaging from "../page/Massaging";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        children: [
            {
                path: "/",
                element: <PrivateRoute><Home/></PrivateRoute>
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/register",
                element: <SignUp/>
            },
            {
                path: "/massenger",
                element: <PrivateRoute><Massaging/></PrivateRoute>
            }
        ]
    }
])