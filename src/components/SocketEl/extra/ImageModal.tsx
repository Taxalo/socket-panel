import {Modal, Image} from "@mantine/core";

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
            {image && <Image key={image} alt={`Captura de pantalla ${image}`}
                             src={`https://sket.chipirones.club/imgs/${image}`}/>}
        </Modal>
    )
}

export default ImageModal;