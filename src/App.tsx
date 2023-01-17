import React, {useEffect} from "react";
import {socket, SocketContext} from "./manager/socketManager";
import {createHashRouter, RouterProvider} from "react-router-dom";
import Home from "./components/Home/Home";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Sockets from "./components/Sockets/Sockets";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {

    const router = createHashRouter([
        {
            path: "/",
            element:
                <ProtectedRoute token={localStorage.getItem("userToken") ?? ""}>
                    <Home/>
                </ProtectedRoute>,
            errorElement: <ErrorPage/>
        },
        {
            path: "sockets",
            element:
                <ProtectedRoute token={localStorage.getItem("userToken") ?? ""}>
                    <Sockets/>
                </ProtectedRoute>,
            errorElement: <ErrorPage/>
        },
        {
            path: "login",
            element: <LoginPage/>,
            errorElement: <ErrorPage/>
        }
    ]);

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