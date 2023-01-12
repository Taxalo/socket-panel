import "./sockets.css";
import SocketEl from "../SocketEl/SocketEl";

function Sockets() {
    return (
        <section id="sockets">
            <div className="grid-3">
                <div className="grid-item">
                    <SocketEl id={"_6zAqEyE3Ck6W3AXAAA4"} name={"EJEM_PLO_12"}/>
                </div>
                <div className="grid-item">
                    <SocketEl id={"B6zAqEyE3Ck6W3AXAAA4"} name={"EJEM_PLO_09"}/>
                </div>
                <div className="grid-item">
                    <SocketEl id={"a6zAqEyE3Ck6W3AXAAA4"} name={"EJEM_PLO_06"}/>
                </div>
            </div>
        </section>

    )
}

export default Sockets;