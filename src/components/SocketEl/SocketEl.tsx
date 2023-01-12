import "./socketel.css";
import {Group, Text, Badge, Button} from "@mantine/core";
import {MdAdsClick} from "react-icons/md";
import {useState} from "react";
import OptionsModal from "./extra/OptionsModal";

type socketParams = {
    name: string,
    id: string
}

function SocketEl({name, id}: socketParams) {
    const [opened, setOpened] = useState(false);

    const manageModal = () => {
        setOpened(!opened);
    }

    return (
        <div className="socket">
            <Group position="apart" mb="xl">
                <Text weight={500}>{name}</Text>
                <Badge size="sm">{id}</Badge>
            </Group>
            <Button mt="xl" leftIcon={<MdAdsClick/>} size="lg" variant="light" onClick={manageModal}>EJECUTAR
                ACCIÓN</Button>

            <OptionsModal name={name} id={id} opened={opened} manageModal={manageModal}/>
        </div>
    )
}

export default SocketEl;