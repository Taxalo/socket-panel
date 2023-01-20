import {Modal, Image, Loader} from "@mantine/core";

const {apiUrl} = require("../../../config.json");

type imageModalType = {
    name: string,
    openedPhoto: boolean,
    managePhotoModal: () => void,
    image: string
}

function ImageModal({name, openedPhoto, managePhotoModal, image}: imageModalType) {

    return (
        <Modal
            size="auto"
            transition="scale"
            centered
            opened={openedPhoto}
            onClose={managePhotoModal}
            title={`SOCKET ${name}`}
        >
            {image === "" ? <div className="text-center"><Loader/></div> :
                <Image key={image} alt={`Captura de pantalla ${image}`}
                       src={`${apiUrl}/imgs/${image}`}/>}
        </Modal>
    )
}

export default ImageModal;