'use client'
import { Box, Button, FormControl, IconButton, InputAdornment, TextField } from "@mui/material";
import styles from "./index.module.scss";
import { NavBar } from "@/components/navbar";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { Footer } from "@/components/footer";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormEvent, useState } from "react";
import { api } from "@/services/axiosClient";
import { toast } from 'react-toastify';

export default function register() {
    const [showPassword, setShowPassword] = useState(false);
    const [name, setname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    function NotifySucess(): undefined {
        toast.success("Cadastro realizado com sucesso!", { position: "top-center" })
    }

    function NotifyError(): undefined {
        toast.error("Preencha todos os campos", { position: "top-center" })
    }

    const types = [
        {
            value: 'CLIENT',
            label: 'Cliente',
        },
        {
            value: 'PROVIDER',
            label: 'Provedor',
        },
    ];

    const handleSubmit = async () => {

        await api.post('/createuser', {
            name,
            email,
            password,
            role
        }).then((response) => {
            setname("");
            setEmail("");
            setPassword("");
            setRole("");
            NotifySucess();
            setTimeout(() => {
                window.location.replace('/login');
            }, 2000);
        }).catch((error) => {
            console.log(error);
            NotifyError();
        })
    }

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
            <Box className={styles.containerregras}>
                <h4 className={styles.regras}>* o tipo de conta "Cliente" poderá somente fazer agendamentos.</h4>
                <h4 className={styles.regras}>* o tipo de conta "Provedor" poderá fazer agendamentos e criar serviços.</h4>
            </Box>
            <Box className={styles.containerform}>
                <Box className={styles.form}>
                    <h1 className={styles.title}>Cadastrar-se</h1>
                    <FormControl className={styles.formInputs}>
                        <h3>Nome:</h3>
                        <TextField
                            className={styles.input}
                            placeholder="Nome"
                            type="text"
                            value={name}
                            onChange={e => {
                                setname(e.target.value);
                            }}
                            variant="outlined"
                            required
                            sx={{ '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#EC6A6A' } }}
                        />
                        <h3>Email:</h3>
                        <TextField
                            className={styles.input}
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={e => {
                                setEmail(e.target.value);
                            }}
                            variant="outlined"
                            required
                            sx={{ '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#EC6A6A' } }}
                        />
                        <Box className={styles.containerinput2}>
                            <Box>
                                <h3>Senha:</h3>
                                <TextField
                                    className={styles.input2}
                                    placeholder="Digite a senha"
                                    variant="outlined"
                                    value={password}
                                    onChange={e => {
                                        setPassword(e.target.value);
                                    }}
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
                            </Box>
                            <Box>
                                <h3>tipo de conta:</h3>
                                <TextField
                                    className={styles.input2}
                                    id="outlined-select-currency-native"
                                    select
                                    required
                                    value={role}
                                    onChange={e => {
                                        setRole(e.target.value);
                                    }}
                                    variant="outlined"
                                    placeholder="Tipo"
                                    SelectProps={{
                                        native: true,
                                    }}
                                    sx={{ '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#EC6A6A' } }}
                                >
                                    {types.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </TextField>
                            </Box>
                        </Box>
                        <Button className={styles.btnregister} onClick={handleSubmit}>Cadastrar</Button>
                        <Box className={styles.login}>
                            <p>Ja tem uma conta?</p>
                            <Button href="/login" className={styles.btnlogin} variant="outlined" size="small">Login</Button>
                        </Box>
                    </FormControl>
                </Box>
            </Box>
            <Footer />
        </Box>
    )
}