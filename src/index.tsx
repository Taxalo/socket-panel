import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./components/Home/Home";
import Sockets from "./components/Sockets/Sockets";
import SocketEl from "./components/SocketEl/SocketEl";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "sockets",
        element: <Sockets/>
    },
    {
        path: "socket/:id",
        element: <SocketEl/>
    }
])

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);
