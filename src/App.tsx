import React, {useEffect} from "react";
import {socket, SocketContext} from "./manager/socketManager";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./components/Home/Home";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Sockets from "./components/Sockets/Sockets";

function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home/>,
            errorElement: <ErrorPage/>
        },
        {
            path: "sockets",
            element: <Sockets/>
        }
    ])

    useEffect(() => {
        socket.on("join", (msg) => {
            console.log(msg);
        });

        socket.on("chat", (msg) => {
            console.log(msg);
        });

        return () => {
            socket.off('join');
        };
    }, []);


    return (
        <SocketContext.Provider value={socket}>
            <RouterProvider router={router}/>
        </SocketContext.Provider>

    )
}

export default App;