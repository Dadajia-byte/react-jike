import Layout from "@/pages/Layout";
import Login from "@/pages/Login";

import { createBrowserRouter } from 'react-router-dom'
import { AuthRoute } from "@/components/AuthRoute";
import Home from "@/pages/home";
import Article from "@/pages/Article";
import Publish from "@/pages/Publish";

// 配置路由
const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthRoute><Layout /></AuthRoute>,
        children: [
            {
                index: true,
                element: <Home></Home>,
            },
            {
                path: 'article',
                element: <Article></Article>,
            },
            {
                path: 'publish',
                element: <Publish></Publish>,
            },
        ]
    },
    {
        path: '/login',
        element: <Login />
    }
])

export default router