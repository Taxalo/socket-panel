import "./errorpage.css";
import {useRouteError, Link} from "react-router-dom";
import {Card, Group, Button, Image, Text, Title} from "@mantine/core";
import errorRaccoon from "../../imgs/error_raccoon.png";

function ErrorPage() {
    const error: any = useRouteError();

    return (
        <Card shadow="sm" p="sm" radius="md" withBorder className="small-width">
            <Card.Section component="a" href="/">
                <Image
                    src={errorRaccoon}
                    height={160}
                    alt="Raccoon trapped"
                />
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
                <Title order={1} color="#D52941">ERROR</Title>
            </Group>

            <Text size="sm" color="dimmed">
                El siguiente error ha ocurrido al acceder a esa ruta:
                <br/>
                <em>{error.statusText || error.message}</em>
            </Text>

            <Link to="/">
                <Button variant="light" color="blue" fullWidth mt="md" radius="md" size={"xl"}>
                    VOLVER
                </Button>
            </Link>
        </Card>
    );
}

export default ErrorPage;
