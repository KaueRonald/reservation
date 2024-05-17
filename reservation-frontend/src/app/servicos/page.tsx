'use client'
import { Box, Button } from "@mui/material";
import styles from "./index.module.scss";
import { NavBar } from "@/components/navbar";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { getStorage } from "@/utils/storage";
import { useEffect, useState } from "react";

export default function servicos() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = getStorage('token');
        setIsLoggedIn(!!token);
    }, []);

    return (
        <Box className={styles.container}>
            <NavBar />
            {isLoggedIn
                ?
                <Box></Box>
                :
                <Box>
                    <Button
                        variant="outlined"
                        className={styles.iconreturn}
                        startIcon={<KeyboardReturnIcon />}
                        href="/"
                    >
                        Voltar
                    </Button>
                </Box>}

        </Box>
    )
}