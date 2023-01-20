import "./loginpage.css";
import {useForm} from '@mantine/form';
import {Button, PasswordInput, TextInput} from "@mantine/core";
import {IoSend} from "react-icons/io5";
import axios from "axios";
import {Navigate} from "react-router-dom";
import {AuthStatus} from "../../hooks/Auth";

const {apiUrl} = require("../../config.json");


function LoginPage() {
    const {loggedIn, checkingStatus} = AuthStatus();
    const form = useForm({
        initialValues: {
            user: '',
            password: '',
        },
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (form.values.user.length === 0 || form.values.password.length === 0) return;

        try {
            const registerPost = await axios.post(`${apiUrl}/login`, {
                user: form.values.user,
                password: form.values.password
            });

            form.setValues({
                user: '',
                password: '',
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
                    <Button type="submit" mt="lg" fullWidth leftIcon={<IoSend/>} size="md" variant="light">Log
                        In</Button>
                </form>
            </div>
        </section>
    )
}

export default LoginPage;