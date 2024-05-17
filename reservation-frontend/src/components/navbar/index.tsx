'use client'
import { AppBar, Box, Button, Toolbar } from "@mui/material"
import styles from "./index.module.scss"
import Image from "next/image"
import agendalogo from "../../../public/Agendalogo.png"
import Link from "next/link"
import { getStorage, clearStorage } from "@/utils/storage"
import { decodeToken } from "react-jwt"
import { useEffect, useState } from 'react';

export const NavBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState('PROVIDER');

    useEffect(() => {
        const token = getStorage('token');
        setIsLoggedIn(!!token);

        function tokenRole(token: string) {
            if (token) {
                const decoded = decodeToken(token);
                return decoded as { role: string };
            }
            return null;
        }

        const decodedToken = token ? tokenRole(token) : null;
        const userRole = decodedToken ? decodedToken.role : 'PROVIDER';

        setRole(userRole);
    }, []);

    return (
        <Box className={styles.container}>
            <AppBar className={styles.nav} position="static">
                <Toolbar className={styles.bar}>
                    <Box className={styles.logo}>
                        <Link href="/">
                            <Image alt="logo" src={agendalogo} height={70} priority />
                        </Link>
                        <p className={styles.logoname}>AgendaSJP</p>
                    </Box>
                    <Box className={styles.btns}>
                        {isLoggedIn ? (
                            <Box className={styles.btnscontainer}>
                                <Button href="/" className={styles.btn} variant="outlined">Perfil</Button>
                                {role === 'PROVIDER' && (
                                    <Button href="/serviços" className={styles.btn} variant="outlined">Meus Serviços</Button>
                                )}
                                <Button href="/agendamentos" className={styles.btn} variant="outlined">Meus Agendamentos</Button>
                                <Button href="/" className={styles.btn} variant="outlined" onClick={clearStorage}>Sair</Button>
                            </Box>
                        ) : (
                            <Box className={styles.btnscontainer}>
                                <Button href="/login" className={styles.btn} variant="outlined">Login</Button>
                                <Button href="/register" className={styles.btn} variant="outlined">Cadastrar</Button>
                            </Box>
                        )}
                    </Box>

                    
                </Toolbar>
            </AppBar>
        </Box>
    );
};
