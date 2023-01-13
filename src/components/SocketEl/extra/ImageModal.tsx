import { Modal, Image } from "@mantine/core";
import {useEffect, useState} from "react";
import axios from "axios";

type imageModalType = {
    name: string,
    openedPhoto: boolean,
    managePhotoModal: () => void
}

function ImageModal({name, openedPhoto, managePhotoModal}: imageModalType) {

    const [images, setImages] = useState([]);

    const getImages = async () => {
        try {
            const imgs = await axios.get("https://sket.chipirones.club/images");

            if (imgs.status !== 200 || !imgs.data) return;

            setImages(imgs.data);
        } catch (e) {
            console.log("Error trying to get images");
        }

    }

    useEffect( () => {
      getImages().catch();

    }, [openedPhoto]);

    return (
        <Modal
        size="auto"
        transition="scale"
        centered
        opened={openedPhoto}
        onClose={managePhotoModal}
        title={`SOCKET ${name}`}
        >
            {images.length <= 0 ? "No images found" : images.map( (i) => {
                return (
                    <Image key={i} alt={`Captura de pantalla ${i}`} src={`/images/${i}`}/>
                )
            })}
        </Modal>
    )
}

export default ImageModal;