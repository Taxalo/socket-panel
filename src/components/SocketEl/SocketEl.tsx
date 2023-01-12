import "./socketel.css";
import {Group, Text, Badge, Button, Modal, TextInput} from "@mantine/core";
import {MdAdsClick} from "react-icons/md";
import {RiScreenshot2Fill, RiShutDownLine} from "react-icons/ri";
import {IoSend} from "react-icons/io5";
import {useContext, useEffect, useState} from "react";
import {SocketContext} from "../../manager/socketManager";
import {Socket} from "socket.io-client";

type socketParams = {
    name: string,
    id: string
}

function SocketEl({name, id}: socketParams) {
    const [opened, setOpened] = useState(false);
    const [command, setCommand] = useState("");
    const [randomPlaceholder, setRandomPlaceholder] = useState("");
    const socket: Socket = useContext(SocketContext);

    const manageModal = () => {
        setOpened(!opened);
    }

    const takeScreenshot = () => {
        socket.emit("extcomm", `${id} ss`);
    }

    const shutdown = () => {
        socket.emit("extcomm", `${id} shutdown`);
    }

    const sendCommand = () => {
        socket.emit("extcomm", `${id} ${command}`);
    }

    const manageCommand = (e: any) => {
        e.preventDefault();
        setCommand(e.target.value);
    }

    useEffect(() => {
        const placeholderList = ["start https://www.youtube.com/watch?v=dQw4w9WgXcQ", "kill chrome.exe",
            "start eclipse.exe", "shutdown -s -t 5000"];
        setRandomPlaceholder(placeholderList[Math.floor(Math.random() * placeholderList.length)]);
    }, []);

    return (
        <div className="socket">
            <Group position="apart" mb="xl">
                <Text weight={500}>{name}</Text>
                <Badge size="sm">{id}</Badge>
            </Group>
            <Button mt="xl" leftIcon={<MdAdsClick/>} size="lg" variant="light" onClick={manageModal}>EJECUTAR
                ACCIÓN</Button>

            <Modal
                size="auto"
                transition="scale"
                centered
                opened={opened}
                onClose={manageModal}
                title={`SOCKET ${name}`}
            >
                <div className="grid-2">
                    <div className="grid-item">
                        <Button leftIcon={<RiScreenshot2Fill/>} size="lg" variant="light"
                                onClick={takeScreenshot}>CAPTURA</Button>
                    </div>
                    <div className="grid-item">
                        <Button leftIcon={<RiShutDownLine/>} size="lg" variant="light"
                                onClick={shutdown}>APAGADO</Button>
                    </div>
                </div>

                <TextInput variant="filled" name="Comando" placeholder={randomPlaceholder} label={"Comando"} onChange={manageCommand} value={command}/>

                <div className="text-center">
                    <Button mt="lg" fullWidth leftIcon={<IoSend/>} size="md" variant="light"
                            onClick={sendCommand}>Enviar</Button>
                </div>
            </Modal>
        </div>
    )
}

export default SocketEl;