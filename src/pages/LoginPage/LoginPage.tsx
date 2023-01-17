import "./loginpage.css";
import {useForm} from '@mantine/form';
import {Button, PasswordInput, TextInput} from "@mantine/core";
import {IoSend} from "react-icons/io5";

function LoginPage() {

    const form = useForm({
        initialValues: {
            user: '',
            password: '',
        },
    });

    const handleSubmit = () => {
        if (form.values.user.length === 0 || form.values.password.length === 0) return;
        form.setValues({
            user: '',
            password: ''
        });

        // TODO: API CALL + aplicar token
    }

    return (
        <section id="login">
            <div className="login-container">
                <h1>LOGIN</h1>
                <form onSubmit={handleSubmit}>
                    <TextInput withAsterisk
                               variant="filled"
                               name="Username"
                               label="Username"
                               placeholder="Username"
                               {...form.getInputProps('user')}/>

                    <PasswordInput
                        withAsterisk
                        variant="filled"
                        placeholder="Password"
                        label="Password"
                        {...form.getInputProps('password')}
                    />
                    <Button type="submit" mt="lg" fullWidth leftIcon={<IoSend/>} size="md" variant="light">Log In</Button>
                </form>
            </div>
        </section>
    )
}

export default LoginPage;