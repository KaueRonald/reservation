'use client'
import { Box, Button } from "@mui/material";
import styles from "./index.module.scss";
import { NavBar } from "@/components/navbar";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { getStorage } from "@/utils/storage";
import { useEffect, useState } from "react";

export default function servicos() {

    return (
        <Box className={styles.container}>
            <NavBar />
        </Box>
    )
}