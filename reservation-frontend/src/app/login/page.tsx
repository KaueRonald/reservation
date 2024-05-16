'use client'
import { Box, Button, FormControl, IconButton, InputAdornment, TextField } from "@mui/material";
import styles from "./index.module.scss"
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormEvent, useState } from "react";
import { api } from "@/services/axiosClient";
import { toast } from 'react-toastify';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    function NotifySucess(): undefined {
        toast.success("Login realizado com sucesso!", { position: "top-center" })
    }

    function NotifyError(): undefined {
        toast.error("Suas credenciais estão incorretas!", { position: "top-center" })
    }

    const handleSubmit = async (event: FormEvent) => {
        await api.post('/login', {
            email,
            password,
        }).then((response) => {
            sessionStorage.setItem('token', response.data.token);
            setEmail("");
            setPassword("");
            NotifySucess();
            setTimeout(() => {
                window.location.replace('/');
            }, 2000);
        }).catch(error => {
            NotifyError();
        })
    };
    return (
        <Box className={styles.container}>
            <NavBar />
            <Box>
                <Button
                    variant="outlined"
                    className={styles.iconreturn}
                    startIcon={<KeyboardReturnIcon />}
                    href="/"
                >
                    Voltar
                </Button>
            </Box>
            <Box className={styles.containerform}>
                <Box className={styles.form}>
                    <h1 className={styles.title}>Login</h1>
                    <FormControl className={styles.forminputs}>
                        <h3>Email:</h3>
                        <TextField
                            className={styles.input}
                            placeholder="Email"
                            onChange={e => {
                                setEmail(e.target.value);
                            }}
                            value={email}
                            type="email"
                            variant="outlined"
                            required
                            sx={{ '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#EC6A6A' } }}
                        />
                        <h3>Senha:</h3>
                        <TextField
                            className={styles.input}
                            placeholder="Digite sua senha"
                            variant="outlined"
                            onChange={e => {
                                setPassword(e.target.value);
                            }}
                            value={password}
                            required
                            type={showPassword ? 'text' : 'password'}
                            sx={{ '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#EC6A6A' } }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <p><a href="/">Esqueci a senha</a></p>
                        <Button className={styles.btn} onClick={handleSubmit} >Login</Button>
                        <Box className={styles.register}>
                            <p>Não tem uma conta?</p>
                            <Button href="/register" className={styles.btnregister} variant="outlined" size="small">Cadastrar</Button>
                        </Box>
                    </FormControl>
                </Box>
            </Box>
            <Footer />
        </Box>
    )
}