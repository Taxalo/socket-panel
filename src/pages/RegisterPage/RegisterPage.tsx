import "./registerpage.css";
import {useForm} from '@mantine/form';
import {Button, PasswordInput, TextInput} from "@mantine/core";
import {IoSend} from "react-icons/io5";
import axios from "axios";
import {AuthStatus} from "../../hooks/Auth";
import {Navigate} from "react-router-dom";
const {apiUrl} = require("../../config.json");

function RegisterPage() {
    const {loggedIn, checkingStatus} = AuthStatus();

    const form = useForm({
        initialValues: {
            user: '',
            password: '',
            password2: ''
        },
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (form.values.user.length === 0 || form.values.password.length === 0 || form.values.password2.length === 0
            || form.values.password !== form.values.password2) return;

        try {
            const registerPost = await axios.post(`${apiUrl}/register`, {
                user: form.values.user,
                password: form.values.password
            });

            form.setValues({
                user: '',
                password: '',
                password2: ''
            });

            if (registerPost.status === 200 && registerPost.data && registerPost.data.token) {
                localStorage.setItem("userToken", registerPost.data.token);
                window.location.reload();
            } else {
                console.log("ERROR")
            }
        } catch (e) {
            console.error("ERROR: " + e);
        }
    }

    if (checkingStatus) return null;

    return loggedIn ? <Navigate to={"/"}/> : (
        <section id="register">
            <div className="regiter-container">
                <h1>Register</h1>
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
                    <PasswordInput
                        withAsterisk
                        variant="filled"
                        placeholder="Password"
                        label="Repeat Password"
                        {...form.getInputProps('password2')}
                    />
                    <Button type="submit" mt="lg" fullWidth leftIcon={<IoSend/>} size="md" variant="light">Log In</Button>
                </form>
            </div>
        </section>
    )
}

export default RegisterPage;