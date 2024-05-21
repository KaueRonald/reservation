'use client'
import { AppBar, Box, Button, Modal, Toolbar } from "@mui/material"
import styles from "./index.module.scss"
import Image from "next/image"
import agendalogo from "../../../public/Agendalogo.png"
import Link from "next/link"
import { getStorage, clearStorage } from "@/utils/storage"
import { decodeToken } from "react-jwt"
import { useEffect, useState } from 'react';
import { Sidebar } from "../sidebar"
import CloseIcon from '@mui/icons-material/Close';

export const NavBar = () => {
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
                    <Sidebar />
                </Toolbar>
            </AppBar>
        </Box>
    );
};
