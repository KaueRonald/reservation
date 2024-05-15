import { Box, Button, FormControl, TextField } from "@mui/material";
import styles from "./index.module.scss"
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function login() {
    return (
        <Box className={styles.container}>
            <NavBar />
            <Box className={styles.containerform}>
                <Box className={styles.form}>
                    <h1 className={styles.title}>Login</h1>
                    <FormControl className={styles.forminputs}>
                        <h3>Email:</h3>
                        <TextField
                            className={styles.input}
                            placeholder="Email"
                            type="email"
                            variant="outlined" 
                            required
                            sx={{ '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#EC6A6A' } }}
                        />
                        <h3>Senha:</h3>
                        <TextField
                            className={styles.input}
                            hiddenLabel
                            placeholder="Senha"
                            type="password"
                            variant="outlined"
                            required
                            sx={{ '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#EC6A6A' } }}
                        />
                        <Button className={styles.btn} >Login</Button>
                        <Box className={styles.register}>
                            <p>Não tem uma conta?</p>
                            <Button href="/register" className={styles.btnregister} variant="outlined" size="small">Cadastrar</Button>
                        </Box>
                    </FormControl>
                </Box>
            </Box>
            <Footer/>
        </Box>
    )
}