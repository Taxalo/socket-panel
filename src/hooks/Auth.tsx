import {useEffect, useState, useRef} from 'react'
import axios from "axios";

const {apiUrl} = require("../config.json");

export const AuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [checkingStatus, setCheckingStatus] = useState(true)
    const isMounted = useRef<boolean>(false)

    const Auth = async () => {
        if (!isMounted.current) isMounted.current = false

        const token = localStorage.getItem('userToken');

        try {
            const validateToken = await axios.get(`${apiUrl}/auth`, {
                headers: {
                    'Authorization': token
                }
            });
            if (validateToken.status === 200) setLoggedIn(true)

        } catch (e) {
            localStorage.removeItem("userToken");
        }
        setCheckingStatus(false);
    }

    useEffect(() => {
        Auth().catch();
    }, [isMounted]);

    return {loggedIn, checkingStatus};
}