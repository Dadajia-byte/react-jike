import Layout from "@/pages/Layout";
import Login from "@/pages/Login";

import { createBrowserRouter } from 'react-router-dom'
import { AuthRoute } from "@/components/AuthRoute";
import { lazy, Suspense } from "react";

// lazy函数
const Home = lazy(() => import('@/pages/home'))
const Article = lazy(() => import('@/pages/Article'))
const Publish = lazy(() => import('@/pages/Publish'))

// 配置路由
const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthRoute><Layout /></AuthRoute>,
        children: [
            {
                index: true,
                element: <Suspense fallback={'加载中'}><Home></Home></Suspense>,
            },
            {
                path: 'article',
                element: <Suspense fallback={'加载中'}><Article></Article></Suspense>,
            },
            {
                path: 'publish',
                element: <Suspense fallback={'加载中'}><Publish></Publish></Suspense>,
            },
        ]
    },
    {
        path: '/login',
        element: <Login />
    }
])

export default router