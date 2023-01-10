import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./styles.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./components/Home/Home";
import Sockets from "./components/Sockets/Sockets";
import SocketEl from "./components/SocketEl/SocketEl";
import {MantineProvider} from '@mantine/core';
import ErrorPage from "./pages/ErrorPage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "sockets",
        element: <Sockets/>
    },
    {
        path: "socket/:socketId",
        element: <SocketEl/>
    }
])

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
                colorScheme: 'dark',
                shadows: {
                    md: '1px 1px 3px rgba(0, 0, 0, .25)',
                    xl: '5px 5px 3px rgba(0, 0, 0, .25)',
                },
            }}>
            <RouterProvider router={router}/>
        </MantineProvider>
    </React.StrictMode>
);
