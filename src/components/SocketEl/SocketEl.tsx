import "./socketel.css";
import {TextInput} from "@mantine/core";
import {useParams} from "react-router-dom";

function SocketEl() {
    const { socketId } = useParams();
    return (
        <div className="socket">
            <h1>SOCKET {socketId ? socketId : "NULL"}</h1>
            <TextInput
                placeholder="Command"
                label="Command"
                description="The command that will be sent to the socket"
                radius="md"
                size="md"
            />
        </div>
    )
}

export default SocketEl;