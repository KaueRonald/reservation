import { Box, Button } from "@mui/material";
import styles from "./page.module.scss";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <Box className={styles.container}>
      <Box className={styles.navbar}>
        <NavBar />
      </Box>
      <Box className={styles.content}>
        <h1 className={styles.title}>
          AgendaSJP: Sua Agenda de Serviços de Beleza na Cidade
        </h1 >
        <h2 className={styles.subtitle}>Encontre e Reserve os Melhores Serviços de Beleza na Cidade!</h2>
        <Button href="/servicos" className={styles.btnservice} variant="outlined">Serviços</Button>
      </Box>
      <Footer />
    </Box>
  );
}
