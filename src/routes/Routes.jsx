import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import FriendDetails from "../pages/FriendDetails";
import Timeline from "../pages/Timeline";
import Stats from "../pages/Stats";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/friend/:id",
            element: <FriendDetails />,
        },
        {
            path: "/timeline",
            element: <Timeline />,
        },
        {
            path: "/stats",
            element: <Stats />,
        },
        ],
    },
]);