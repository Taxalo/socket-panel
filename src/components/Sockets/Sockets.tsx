import "./sockets.css";
import SocketEl from "../SocketEl/SocketEl";
import {useEffect, useState} from "react";
import axios from "axios";

type socketType = {
    id: string,
    name: string
}

function Sockets() {
    const [sockets, setSockets] = useState<socketType[]>();
    const getSockets = async () => {
        try {
            const skets = await axios.get("https://sket.chipirones.club/sockets")
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
                        <div className="grid-item">
                            <SocketEl name={s.name} id={s.id}/>
                        </div>
                    )
                })}
            </div>
        </section>

    )
}

export default Sockets;