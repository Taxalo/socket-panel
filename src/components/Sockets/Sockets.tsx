import "./sockets.css";
import SocketEl from "../SocketEl/SocketEl";
import {useEffect, useState} from "react";
import axios from "axios";

const {apiUrl} = require("../../config.json");

type socketType = {
    id: string,
    name: string
}

function Sockets() {
    const [sockets, setSockets] = useState<socketType[]>();
    const getSockets = async () => {
        try {
            const skets = await axios.get(`${apiUrl}/sockets`, {
                headers: {
                    "Authorization": localStorage.getItem("userToken")
                }
            });
            if (skets.status !== 200 || !skets.data) return;

            setSockets(skets.data);
        } catch (e) {
            console.log("Could not get socket list");
        }
    }

    useEffect(() => {
        getSockets().catch();
    }, []);


    return (
        <section id="sockets">
            <div className="grid-3">
                {sockets && sockets.map((s) => {
                    return (
                        <div className="grid-item" key={s.id}>
                            <SocketEl name={s.name} id={s.id}/>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default Sockets;