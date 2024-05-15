import { AppBar, Box, Button, Toolbar } from "@mui/material"
import styles from "./index.module.scss"
import Image from "next/image"
import agendalogo from "../../../public/Agendalogo.png"
import Link from "next/link"


export const NavBar = () => {
    return (
        <Box className={styles.container}>
            <AppBar className={styles.nav} position="static">
                <Toolbar className={styles.bar}>
                    <Box className={styles.logo}>
                        <Link href="/">
                            <Image alt="logo" src={agendalogo} height={70} /></Link>
                        <p className={styles.logoname}>AgendaSJP</p>
                    </Box>
                    <Box className={styles.btns}>
                        <Button href="/login" className={styles.btn} variant="outlined">Login</Button>
                        <Button href="/register" className={styles.btn} variant="outlined">Cadastrar</Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box >
    )
}