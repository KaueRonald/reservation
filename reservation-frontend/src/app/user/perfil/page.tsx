'use client'
import { Box } from "@mui/material";
import styles from "./index.module.scss";
import { NavBar } from "@/components/navbar";

export default function perfil() {

    return (
        <Box className={styles.container}>
            <NavBar />
        </Box>
    )
}