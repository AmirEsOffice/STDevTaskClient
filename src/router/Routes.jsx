import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import RequireAuth from "./RequireAuth";
import SignIn from "../features/pages/account/SignIn";
import SignUp from "../features/pages/account/SignUp";
import Posts from "../features/pages/posts/Posts";
import PostForm from "../features/pages/posts/PostForm";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        
        children: [
            {
                element: <RequireAuth />, children: [
                    { path: "", element: <Posts /> },
                    { path: "post", element: <PostForm /> },
                    { path: "post/:postId", element: <PostForm /> },
                ]
            },
           
   
            { path: "server-error", element: <ServerError /> },
            { path: "not-found", element: <NotFound /> },
            { path: "*", element: <Navigate replace to="not-found" /> },
            
        ]
    },
    {
        path:"/SignIn",
        element: <SignIn /> ,
    }
    ,
    {
        path:"/SignUp",
        element: <SignUp /> ,
    }
    
])