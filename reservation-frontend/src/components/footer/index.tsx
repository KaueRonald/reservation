import { Box } from "@mui/material";
import styles from "./index.module.scss"
import Image from "next/image";
import TriDev from "../../../public/tridev.png";
import Link from "next/link";

export const Footer = () => {
    return (
        <Box className={styles.container}>
            <Box className={styles.footer}>
                <Box className={styles.logo}>
                    <Link className={styles.logo} href="https://www.tridev.com.br/" target="_blank">
                        <Image alt="tridev" src={TriDev} height={60} />
                    </Link>
                    <p>&copy; 2024 Tridev Soluções. Todos os direitos reservados.</p>
                </Box>
            </Box>
        </Box>
    )
}