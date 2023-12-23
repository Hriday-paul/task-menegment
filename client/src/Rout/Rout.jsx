import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../pages/Home/Home"
import Login from "../pages/Login/Login"
import Register from "../pages/Register/Register"
import PrivateRout from "../component/Navbar/private/PrivateRout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Todos from "../pages/Todos/Todos";

const rout = createBrowserRouter([
    {
        path : '/',
        element : <Root></Root>,
        children : [
            {
                path : "/",
                element : <Home></Home>
            },
        ]
    },
    {
        path : "/dashboard",
        element : <PrivateRout><Dashboard></Dashboard></PrivateRout>,
        children : [
            {
                path : '/dashboard/todos',
                element : <Todos></Todos>
            }
        ]
    },
    {
        path : "/login",
        element : <Login></Login>
    },
    {
        path : "/register",
        element : <Register></Register>
    },
])

export default rout;