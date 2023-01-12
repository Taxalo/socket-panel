import { Modal, Image } from "@mantine/core";

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
            <Image alt="Captura de pantalla" src={image}/>
        </Modal>
    )
}

export default ImageModal;